const mongoose = require("mongoose");

const Resource = new mongoose.Schema({
    Sector:
    {
        type: String,
    },
    HR_ID:
    {
        type: String,
    },
    HRName:
    {
        type: String,
    },
    Name:
    {
        type: String,
    },
    Email:
    {
        type: String,
    },
    Phone:
    {
        type: String,
    },
    Gender:
    {
        type: String,
    },
    MaritalStatus:
    {
        type: String,
    },
    Age:
    {
        type: String,
    },
    State:
    {
        type: String,
    },
    City:
    {
        type: String,
    },
    Qualifications:
    {
        type: Array,
    },
    Skills:
    {
        type: Array,
    },
    TotalExp:
    {
        type: String,
    },
    RelaventExp:
    {
        type: String,
    },
    NoticePeriod:
    {
        type: String,
    },
    CurrentCTC:
    {
        type: String,
    },
    ExpectCTC:
    {
        type: String,
    },
    SalaryMode:
    {
        type: String,
    },
    Department:
    {
        type: String,
    },
    Designation:
    {
        type: String,
    },
    Resume:
    {
        type: String,
    },
    ContactedDate:
    {
        type: String,
    },
    InterviewDate:
    {
        type: String,
    },
    ClientName:
    {
        type: String,
    },
    ClientLocation:
    {
        type: String,
    },
    InterviewStatus:
    {
        type: String,
    },
    Comments:
    {
        type: Array,
    },
    created:
    {
        type: Date
    },
    isActive:
    {
        type: Boolean,
        default:true
    }
})

module.exports = mongoose.model("resources", Resource);
