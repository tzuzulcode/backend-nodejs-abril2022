const res = require("express/lib/response");
const JobModel = require("../models/job")

class Job{

    // Recupera todas los puestos de trabajo realizados por los empleadores
    async getAll(){
        try {
            const jobs = await JobModel.find()
            return jobs
        } catch (error) {
            console.log(error);
        }
    }

    // Recupera un puesto de trabajo por su ID
    async getOne(id){
        try {
            const job = await JobModel.findById(id)
            return job
        } catch (error) {
            console.log(error);
        }
    }

    // Registra un nuevo puesto de trabajo a partir del empleador del token
    async create(data){
        try { 
            // La función cambia a minusculas todos los string de categoria para luego facilitar la busqueda
            data.category = this.#toLowerCaseList(data.category)
            const job = await JobModel.create(data)
            return job
        } catch (error) {
            console.log(error);
        }
    }

    // Agrega el documento de puesto de trabajo un nuevo postulante de acuerdo a la información del token
    async apply(id, data){
        try {
            // La función valida si existe un puesto de trabajo con un determinado ID
            const validationJob = await this.#validationJob(id)
            if (!validationJob.status){
                // La función valida si el postunlante ya se postuló en el puesto
                const validationApplicant = await this.#validationApplicant(id, data.id)
                if(!validationApplicant.status){
                    const job = await JobModel.findByIdAndUpdate(id, { $push: {applicants: data}}, {new: true})
                    return job
                }
                return {
                    error: validationApplicant.status,
                    message: validationApplicant.message
                } 
                
            }
            return {
                error: validationJob.status,
                message: validationJob.message
            } 
        } catch (error) {
            console.log(error);
        }
    }

    // Elimina la postulación de un postulante a un puesto de trabajo, de acuerdo al token
    async unapply(id, userApplicant){
        try {
            console.log(userApplicant);
            const validationJob = await this.#validationJob(id)
            if (!validationJob.status){
                const validationApplicant = await this.#validationApplicant(id, userApplicant.id)
                if(validationApplicant.status){
                    const job = await JobModel.findByIdAndUpdate(id, { $pull: {applicants: {id: userApplicant.id}}}, {new: true})
                    return job
                }
                return {
                    error: !validationApplicant.status,
                    message: validationApplicant.message
                } 
                
            }
            return {
                error: validationJob.status,
                message: validationJob.message
            } 
        } catch (error) {
            console.log(error);
        }
    }

    // Filtra los puestos de trabajos por categoria de acuerdo a un array de string 
    async getJobByCategory(categories){
        try {
            categories.category = this.#toLowerCaseList(categories.category)
            const jobs = await JobModel.find({
                category: {
                    $all: categories.category
                }
            })
            if (jobs[0]) {
                return jobs
            }
            return {
                message: "There are no jobs for those categories"
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Filtra los puestos de trabajo por ubicación de acuerdo a pais, provincia o ciudad
    async getJobByLocation(location){
        try {
            let jobs
            if (location.country){
                jobs = await JobModel.find({
                    "location.country": location.country
                })
            }
            if (location.province){
                jobs = await JobModel.find({
                    "location.province": location.province
                })
            }
            if (location.city){
                jobs = await JobModel.find({
                    "location.city": location.city
                })
            }
            if (jobs[0]) {
                return jobs
            }
            return {
                message: "There are no jobs for those locations"
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Recupera los puestos de trabajo a los que un postulante se postuló a partir del token
    async getJobByApplicant(applicant){
        try {
            const jobs = await JobModel.aggregate([
                {
                  $unwind: "$applicants"
                },
                {
                  $match: {
                    "applicants.id": applicant.id
                  }
                }
              ])
            if (jobs[0]){
                return jobs
            }
            return {
                error: true,
                message: "No job applications found"
            }
        } catch (error) {
            console.log(error);
        }

    }

    // Recupera los puestos de trabajo que un empleador registro a partir del token
    async getJobByEmployer(employer){
        try {
            const jobs = await JobModel.find({"employer.id": employer.id})
            if (jobs[0]){
                return jobs
            }
            return {
                error: true,
                message: "No jobs created were found"
            }
        } catch (error) {
            console.log(error);
        }

    }

    // Cambia el estado del puesto de trabajo para identificar la finalización de la reclutación
    async updateState(idJob, employer){
        try {
            const validationJob = await this.#validationJob(idJob)
            console.log("JOB", validationJob.status);
            if (!validationJob.status){
                const validationEmployer = await this.#validationEmployer(idJob, employer)
                console.log("EMPLOYER", validationEmployer.status);
                if (!validationEmployer.status){
                    const job = await JobModel.findByIdAndUpdate(idJob, {state: false}, {new: true})
                    return job
                }
                return {
                    error: validationEmployer.status,
                    message: validationEmployer.message
                }
            }
            return {
                error: validationJob.status,
                message: validationJob.message
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Valida si un determinado empleador registro un determinado puesto de trabajo
    async #validationEmployer(idJob, userEmployer){
        try {
            console.log(userEmployer);
            const employer = await JobModel.findById(idJob)
            if(employer.employer.id === userEmployer.id){
                return {
                    status: false,
                    message: ""
                }
            }
            return {
                status: true,
                message: "You did not create this job"
            }

        } catch (error) {
            console.log(error);
        }
    }

    // Valida si un puesto de trabajo existe a partir de su ID
    async #validationJob(id){
        try {
            
            const job = await JobModel.findById(id)
            if (job) {
                return {
                    status: false,
                    message: ""
                }
            }
            return {
                status: true,
                message: "The job doesn't exist"
            }
            
        } catch (error) {
            console.log("error catch", error);
        }
    }

    // Valida si un determinado postulante ya realizó la postulación a un determinado puesto de trabajo
    async #validationApplicant(idJob, idApplicant){
        try {
            /* const applicant = await JobModel.findOne({_id: idJob, applicants: {$all: [{id: idApplicant}]}}) */
            const applicant = await JobModel.findById(idJob)
            let band = false
            applicant.applicants.forEach(a => {
                if(a.id === idApplicant){
                    band = true
                }
            });
            if (band){
                return {
                    status: true,
                    message: "You are already applied to the job"
                }
            }
            return {
                status: false,
                message: "You did not apply for this job"
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    // Cambia los string de categoria a minusculas para facilitar el filtro
    #toLowerCaseList(category){
        for (let i = 0; i < category.length; i++) {
            category[i] = category[i].toLowerCase()
        }
        return category
    }
}

module.exports = Job