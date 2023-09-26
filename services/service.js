const express = require('express');
const app = express();
const route = express.Router();


exports.teacher_homepage=(req,resp)=>{
    resp.render("../ejs_display/Teachers_Display_Page")
}

exports.student_edit=(req,resp)=>{
    resp.render("../ejs_display/Student_Edit_Page")
}

