const express = require("express")
const {authMiddleware} = require("../middleware/authValidation")
const JobService = require("../services/jobs")

function jobs(app){
    const router = express.Router()
    const jobServ = new JobService()

    app.use("/api/jobs",router)
    
    router.get("/", ...authMiddleware("applicant-employer-admin"), async(req,res) => {
        const jobs = await jobServ.getAll()
        return res.json(jobs)
        
    })

    router.get("/:id", ...authMiddleware("applicant-employer-admin"), async(req,res) => {
        const jobs = await jobServ.getOne(req.params.id)
        return res.json(jobs)
        
    })

    router.post("/", ...authMiddleware("employer"), async (req,res) => {
        const data = req.body
        data.employer = req.user
        const job = await jobServ.create(data)
        return res.json(job)
    })

    router.put("/apply/:id", ...authMiddleware("applicant"), async (req, res) => {
        const applicant = req.user
        const job = await jobServ.apply(req.params.id, applicant)
        return res.json(job)
    })

    router.put("/unapply/:id", ...authMiddleware("applicant"), async (req, res) => {
        const applicant = req.user
        const job = await jobServ.unapply(req.params.id, applicant)
        return res.json(job)
    })

    router.post("/category", ...authMiddleware("applicant"), async (req, res) => {
        console.log(req.body)
        const jobs = await jobServ.getJobByCategory(req.body)
        return res.json(jobs)
    })

    router.post("/location", ...authMiddleware("applicant"), async (req, res) => {
        const jobs = await jobServ.getJobByLocation(req.body)
        return res.json(jobs)
    })

    router.post("/me", ...authMiddleware("applicant"), async (req,res) => {
        const jobs = await jobServ.getJobByApplicant(req.user)
        return res.json(jobs)
    })

    router.put("/state/:id", ...authMiddleware("employer"), async (req, res) => {
        const job = await jobServ.updateState(req.params.id, req.user)
        return res.json(job)
    })

    router.post("/employer", ...authMiddleware("employer"), async (req, res) => {
        const job = await jobServ.getJobByEmployer(req.user)
        return res.json(job)
    })


}

module.exports = jobs