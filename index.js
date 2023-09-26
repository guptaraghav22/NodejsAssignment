const express = require('express');
const path = require('path')
const app = express();
const route = express.Router();
const controller = require("./controller/controller")
const bodyParser = require('body-parser');
const { response } = require('express');
const session = require("express-session")
const {v4:uuidv4}=require("uuid")
const { check, validationResult } = require('express-validator');
const { urlencoded } = require('body-parser');

app.use('/',route)
route.use(bodyParser.json())
route.use(bodyParser.urlencoded({extended:false}))
route.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))
app.set('view engine','ejs')
app.use("/css",express.static(path.resolve(__dirname,"css")))
route.use("/js",express.static(path.resolve(__dirname,"jslogic")))
app.use("/js",express.static(path.resolve(__dirname,"jslogic")))
route.get("/",controller.homepage)
route.get("/teacher-login",[check('email',' * Email Required').exists()],controller.teacher_login)
route.post("/teacher-display",controller.teacher_login_check)
 route.get("/teacher-display",controller.teacher_display)
 route.get("/edit/:rollno",controller.edit_student)
 route.put("/edit/:rollno",[check('Name',' * Name Required').exists().isLength({min:1}),
 check('Score',' * Score Required').exists().isLength({min:1}),
 check('dob',' * Date Of Birth Required').exists().isLength({min:3}),
 
],controller.update_student)
 route.get("/Add-Student",controller.add_student)
 route.post("/save_student",controller.save_student)
 route.delete("/delete-student/:rollno",controller.delete_students)
 route.get("/student-result",controller.student_homepage)
 route.post("/student-result",controller.studentresult)
 route.get("/teacher-display/teacher-logout",controller.teacher_logout)
route.get("/error",controller.error)
route.post("/save-stu",[check('Roll_no',' * Rollno Required').exists().isLength({min:1}),
            check('Name',' * Name Required').exists().isLength({min:1}),
            check('dob',' * Date Of Birth Required').exists().isLength({min:3}),
            check('Score',' * Score Required').exists().isLength({min:1}),],controller.save_student
)
 app.listen(3001)