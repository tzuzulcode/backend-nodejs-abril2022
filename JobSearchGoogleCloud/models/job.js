const {mongoose} = require("../config/db")

const Schema = mongoose.Schema

const jobSchema = new Schema({
    employer: {
        id: String,
        name: String,
        email: String,
        role: {
            type: String,
            enum: ["applicant", "employer", "admin"]
        },
        birthday: { 
            type: Date, 
            default: Date.now 
        }
    },
    description: String,
    title: String,
    applicants: [{
        _id: String,
        id: String,
        name: String,
        email: String,
        role: {
            type: String,
            enum: ["applicant", "employer", "admin"]
        },
        birthday: { 
            type: Date, 
            default: Date.now 
        }
    }],
    category: [String],
    creationDate: { 
        type: Date, 
        default: Date.now 
    },
    location: {
        country: String,
        province: String,
        city: String
    },
    salary: Number,
    state: { 
        type: Boolean,
        default: true
    }
})

const JobModel = mongoose.model("Job", jobSchema)

module.exports = JobModel