const express = require("express");
const router = express.Router();
const path = require('path')
const { UserTable, DepartmentTable, DesignationTable, CityTable } = require("../../models/subModels");
const Resource = require("../../models/resources");
const { saveFile, deleteFile } = require("../controller");

router.use("/OS_HR_portal", express.static(path.join(__dirname + `../../../public/resumes/`)));

router.post("/resource/create", async (req, res) => {
    try {
        console.log(req.body)
        var resume = ''
        var data = new Resource(req.body)
        data.Skills = JSON.parse(req.body.Skills)
        data.Qualifications = JSON.parse(req.body.Qualifications)
        data.created = new Date()
        if (req.files && req.files.Resume) {
            var datetimestamp = Math.floor(Math.random() * 10000000000000000);
            resume = datetimestamp + '.' + req.files.Resume.name.split('.')[req.files.Resume.name.split('.').length - 1]
            saveFile(req.files.Resume, resume)
        }
        data.Resume = resume
        await data.save();
        res.json(data);

    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

router.put("/resource/update/:id", async (req, res) => {
    try {
        var data = await Resource.findOne({ _id: req.params.id })

        if (data) {
            var resume = data.Resume
            if (req.files && req.files.Resume) {
                deleteFile(resume)
                var datetimestamp = Math.floor(Math.random() * 10000000000000000);
                resume = datetimestamp + '.' + req.files.Resume.name.split('.')[req.files.Resume.name.split('.').length - 1]
                saveFile(req.files.Resume, resume)
            }
            var editData = await Resource.updateMany({ _id: req.params.id }, {
                $set: {
                    Sector: req.body.Sector,
                    HRName: req.body.HRName,
                    Name: req.body.Name,
                    Email: req.body.Email,
                    Phone: req.body.Phone,
                    Gender: req.body.Gender,
                    MaritalStatus: req.body.MaritalStatus,
                    Age: req.body.Age,
                    State: req.body.State,
                    City: req.body.City,
                    TotalExp: req.body.TotalExp,
                    RelaventExp: req.body.RelaventExp,
                    NoticePeriod: req.body.NoticePeriod,
                    CurrentCTC: req.body.CurrentCTC,
                    ExpectCTC: req.body.ExpectCTC,
                    SalaryMode: req.body.SalaryMode,
                    Department: req.body.Department,
                    Designation: req.body.Designation,
                    ContactedDate: req.body.ContactedDate,
                    InterviewDate: req.body.InterviewDate,
                    ClientName: req.body.ClientName,
                    ClientLocation: req.body.ClientLocation,
                    InterviewStatus: req.body.InterviewStatus,
                    Resume: resume,
                }
            })

            data.Resume = resume
            if (req.body.Skills) {
                data.Skills = JSON.parse(req.body.Skills)
            }
            if (req.body.Qualifications) {
                data.Qualifications = JSON.parse(req.body.Qualifications)
            }
            await data.save();
            res.json(data);
        }

    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

router.put("/resource/comment/:id", async (req, res) => {
    try {
        var data = await Resource.findOne({ _id: req.params.id })
        const datas = {
            Remark: req.body.Remark,
            Created: new Date()
        }
        data.Comments.push(datas)
        await data.save()
        const newData = await Resource.findOne({ _id: req.params.id })
        res.json(newData);
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

router.get("/resource/list-all", async (req, res) => {
    try {
        const data = await Resource.find({ isActive: true }).sort({ "created": -1 });
        var list =[]
        for(var val of data){
            const filter = await convertion(val)
            list.push(filter)
        }
        res.json(list);
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

router.put("/resource/delete/:id", async (req, res) => {
    try {
        var data = await Resource.findOne({ _id: req.params.id })
        data.isActive = false
        await data.save()
        res.json(data);
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

router.get("/cities", async (req, res) => {
    try {
        const data = await CityTable.aggregate([
            {
                $group: {
                    _id: {
                        State: "$state"
                    },
                    Cities: {
                        $push: "$name"
                    }
                }
            },
            {
                $sort: {
                    "_id.State": 1
                }
            },
            {
                $project: {
                    _id: 0,
                    State: "$_id.State",
                    City: "$Cities"
                }
            }
        ])
        res.json(data);
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

const convertion = async (data) => {
    if(data){

        var depName =''
        var desName =''

        if(data.Department){
            const depa = await DepartmentTable.findOne({_id:data.Department})
            if(depa){depName=depa.Department}
        }
        if(data.Designation){
            const depa = await DesignationTable.findOne({_id:data.Designation})
            if(depa){desName=depa.Designation}
        }

        const datas ={
            _id: data._id,
            Sector: data.Sector,
            HR_ID: data.HR_ID,
            HRName: data.HRName,
            Name: data.Name,
            Email: data.Email,
            Phone: data.Phone,
            Gender: data.Gender,
            MaritalStatus: data.MaritalStatus,
            Age: data.Age,
            State: data.State,
            City: data.City,
            TotalExp: data.TotalExp,
            RelaventExp: data.RelaventExp,
            NoticePeriod: data.NoticePeriod,
            CurrentCTC: data.CurrentCTC,
            ExpectCTC: data.ExpectCTC,
            SalaryMode: data.SalaryMode,
            Department: data.Department,
            DepartmentName: depName,
            Designation: data.Designation,
            DesignationName: desName,
            Resume: data.Resume,
            ContactedDate: data.ContactedDate,
            InterviewDate: data.InterviewDate,
            ClientName: data.ClientName,
            ClientLocation: data.ClientLocation,
            InterviewStatus: data.InterviewStatus,
            Comments: data.Comments,
            created: data.created,
            Skills: data.Skills,
            Qualifications: data.Qualifications,
        }
        return datas
    }else{
        return []
    }
}

module.exports = router;