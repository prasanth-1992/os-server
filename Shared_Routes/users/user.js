const express = require("express");
const router = express.Router();
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserTable, DepartmentTable, DesignationTable } = require("../../models/subModels");
const { sendEmail } = require("../controller");

router.post("/user/register", async (req, res) => {
    try {
        if (req.body) {
            const newPassword = otpGenerator.generate(8, { alphabets: false, upperCase: false, specialChars: false });
            var data = new UserTable(req.body)
            data.Password = newPassword
            data.created = new Date()
            sendEmail(data)
            const salt = await bcrypt.genSalt(10);
            data.Password = await bcrypt.hash(data.Password, salt);
            await data.save();
            res.json(data);
        }

    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

//user login 
router.post("/user/login", async (req, res) => {
    try {

        const user = await UserTable.findOne({ Email: req.body.Email })
        if (!user) {
            res.json({ result: "error", message: "Email Doesn't exist" })
        }
        else {

            const isvalid = await bcrypt.compare(req.body.Password, user.Password);
            if (!isvalid) {
                res.json({ result: "error", message: "Password doesn't match" })

            }
            else {
                jwt.sign({ Email: user.Email, UserID: user._id, Name: user.Name, UserType: 'User' }, 'secretkey',
                    { expiresIn: '14d' }, (err, token) => {
                        if (err) {
                            res.json({ result: "error", message: "Token Generation failed, Try Again!" })
                        } else {
                            res.json({ result: "success", token: token })
                        }

                    })
            }
        }
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

// Change password
router.put("/user/change-password/:id", async (req, res) => {
    if (req.params.id && req.params.id !== "undefined") {
        try {
            const salt = await bcrypt.genSalt(10);
            var data = await UserTable.findOne({ _id: req.params.id })
            const isvalid = await bcrypt.compare(req.body.OldPassword, data.Password);
            if (!isvalid) {
                res.json({ result: "error", message: "Old Password is Wrong" })
            } else {
                data.Password = await bcrypt.hash(req.body.NewPassword, salt);
                await data.save()
                res.json({ result: "success", message: "Password Changed Success" })
            }
        } catch (err) {
            if (err) {
                console.log(err)
            }
        }
    }
})

//Update
router.put("/user/update/:id", async (req, res) => {
    try {
        var data = await UserTable.updateMany({ _id: req.params.id }, {
            $set: {
                Name: req.body.Name,
                Email: req.body.Email,
                Phone: req.body.Phone,
                Department: req.body.Department,
                Designation: req.body.Designation,
            }
        })
        res.json(data)
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

//List all 
router.get("/user/list-all", async (req, res) => {
    try {
        var data = await UserTable.find().sort({ "created": -1 });
        var list = []
        for (var val of data) {
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

//get particular 
router.get("/user/get-one/:id", async (req, res) => {
    if (req.params.id && req.params.id !== "undefined") {
        try {
            var data = await UserTable.findById({ _id: req.params.id })
            const filter = await convertion(data)
            res.json(filter)
        } catch (err) {
            if (err) {
                console.log(err)
            }
        }
    }
})

const convertion = async (data) => {
    if (data) {
        var depart = ''
        var design = ''
        if (data.Department) {
            const dep = await DepartmentTable.findOne({ _id: data.Department })
            if (dep) { depart = dep.Department }
        }
        if (data.Designation) {
            const dep = await DesignationTable.findOne({ _id: data.Designation })
            if (dep) { design = dep.Designation }
        }
        const datas = {
            _id: data._id,
            Name: data.Name,
            Email: data.Email,
            Phone: data.Phone,
            Department: data.Department,
            DepartmentName: depart,
            Designation: data.Designation,
            DesignationName: design,
        }
        return datas

    } else {
        return []
    }
}

module.exports = router;