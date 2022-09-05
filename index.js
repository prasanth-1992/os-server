//Third Party Module
const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")
const fileUpload = require('express-fileupload');

require('dotenv').config()

//Middleware 
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//Router
var Users = require("./Shared_Routes/users/user");
var subModels = require("./Shared_Routes/settings/settingsRoute");
var Resource = require("./Shared_Routes/resources/resource");

app.use('/', Users)
app.use('/', subModels)
app.use('/', Resource)

// Step 1
var PORT = process.env.PORT || 4040;

//Listen Port
app.listen(PORT, () => { console.log("Backend started at this port " + PORT); })

//DB Connection 

mongoose.connect(process.env.MONGODB_URI, err => {
  if (!err) {
    console.log("MongoDB Connected");
  }
  else {
    { console.log('Error in DB connection : ' + err) }
  }
});
