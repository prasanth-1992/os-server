const mongoose = require("mongoose");

const Users = new mongoose.Schema({
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
    Password:
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
    created:
    {
        type: Date
    }
})

const Departments = new mongoose.Schema({
    Department: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
})

const Designations = new mongoose.Schema({
    Designation: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
})

const Skills = new mongoose.Schema({
    Skill: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
})

const Qualifications = new mongoose.Schema({
    Qualification: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
})

const Cities = new mongoose.Schema({
    name: {
        type: String,
    },
    state: {
        type: String,
    },
})

const UserTable = mongoose.model("users", Users);
const DepartmentTable = mongoose.model("departments", Departments);
const DesignationTable = mongoose.model("designations", Designations);
const SkillTable = mongoose.model("skills", Skills);
const QualifyTable = mongoose.model("qualifications", Qualifications);
const CityTable = mongoose.model("cities", Cities);

module.exports = { CityTable, UserTable, DepartmentTable, DesignationTable, SkillTable, QualifyTable }
