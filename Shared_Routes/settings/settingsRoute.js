const express = require("express");
const router = express.Router();
const { DepartmentTable, DesignationTable, SkillTable, QualifyTable } = require("../../models/subModels");

router.post("/subModule/create", async (req, res) => {
    try {
        if (req.body.Department) {
            const data = new DepartmentTable(req.body)
            await data.save();
            res.json(data);
        }
        if (req.body.Designation) {
            const data = new DesignationTable(req.body)
            await data.save();
            res.json(data);
        }
        if (req.body.Skill) {
            const data = new SkillTable(req.body)
            await data.save();
            res.json(data);
        }
        if (req.body.Qualification) {
            const data = new QualifyTable(req.body)
            await data.save();
            res.json(data);
        }

    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})


//Update
router.put("/subModule/update/:id", async (req, res) => {
    try {
        if (req.body.Department) {
            const data = new DepartmentTable.updateMany({ _id: req.params.id }, { $set: (req.body) })
            res.json(data);
        }
        if (req.body.Designation) {
            const data = new DesignationTable.updateMany({ _id: req.params.id }, { $set: (req.body) })
            res.json(data);
        }
        if (req.body.Skill) {
            const data = new SkillTable.updateMany({ _id: req.params.id }, { $set: (req.body) })
            res.json(data);
        }
        if (req.body.Qualification) {
            const data = new QualifyTable.updateMany({ _id: req.params.id }, { $set: (req.body) })
            res.json(data);
        }
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})


//List all 
router.get("/subModule/list-all", async (req, res) => {
    try {
        var depList = []
        var desList = []
        var skillList = []
        var eduList = []
        const depart = await DepartmentTable.find();
        for (var val of depart) {
            depList.push({ label: val.Department, value: val._id })
        }
        const design = await DesignationTable.find();
        for (var val2 of design) {
            desList.push({ label: val2.Designation, value: val2._id })
        }
        const skill = await SkillTable.find();
        for (var val3 of skill) {
            skillList.push({ label: val3.Skill, value: val3._id })
        }
        const edu = await QualifyTable.find();
        for (var val4 of edu) {
            eduList.push({ label: val4.Qualification, value: val4._id })
        }
        res.json({Depart:depList,Design:desList,Skill:skillList,Education:eduList});
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

module.exports = router;