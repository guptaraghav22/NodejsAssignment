let con = require("../sql_connection/sql")
const {validationResult } = require('express-validator')
exports.homepage=(req,resp)=>{
    resp.render("../ejs_display/HomePage.ejs")
}
exports.teacher_login=(req,resp)=>{
    resp.render("../ejs_display/Teacher_Login_Page.ejs",{error:""})
}

exports.teacher_login_check=(req,resp)=>{
    
    if(req.body.email==''&& req.body.password=='')
    {
        resp.render("../ejs_display/Teacher_Login_Page.ejs",{error:"Please Provide Both"})
    }
    else if(req.body.email=='')
    {
        resp.render("../ejs_display/Teacher_Login_Page.ejs",{error:"Please Enter Email"})
        
    }
    else if(req.body.password=="")
    {
        resp.render("../ejs_display/Teacher_Login_Page.ejs",{error:"Please Enter Password"})
    
    }
    else if(req.body.email!="" && req.body.password!="")
    {   
        let data=[req.body.email,req.body.password]
        
        con.query("select * from teachersdb where Email=? and Password=?",data,(error,result)=>{
            if(result==''){
                resp.render("../ejs_display/Teacher_Login_Page.ejs",{error:"User Not Registered"})
            }
            else {
               req.session.user = req.body.email
             resp.redirect("/teacher-display")
                
        }
        
        })
    }
    else{
        resp.render("../ejs_display/Teacher_Login_Page.ejs",{error:"Please Enter Password"})
    
    }

   


}

exports.teacher_display=(req,resp)=>{
    if(req.session.user!=null){
        con.query("select * from studentsdb",(error,result)=>{
            resp.render("../ejs_display/Teachers_Display_Page",{user:req.session.user,student_data:result})
        
       })
    }
    else{
      resp.redirect("/error")  
    }
        
    
}

exports.edit_student=(req,resp)=>{
    let rollno  = [req.params.rollno]
    
    con.query("select * from studentsdb where Roll_no=?",rollno,(error,result)=>{
         resp.render("../ejs_display/Student_Edit_Page.ejs",{userinfo:result})
     
    
   })
}
    

exports.update_student=(req,resp)=>{

    const errors = validationResult(req);
    const alertarray=errors.array()
    console.log(errors)
    let data = [req.body.Score,req.body.Name,,req.body.dob,req.body.Roll_no]
    
    if(errors.isEmpty())
    {  let data = [req.body.Name,req.body.Score,req.body.dob,req.body.Roll_no]
        con.query("update studentsdb  set  Name=?, Score=?,dob=? where Roll_no=? ",data,(error,result)=>{
            if(error){
                console.error("Error")
            }
            else if(result){
                console.log("Data Updated Successfully")
            }
        })}
        else{
            console.log(1)
            resp.render("../ejs_display/Student_Edit_Page.ejs",{userinfo:data,e:alertarray})
            
        }


}

exports.add_student=(req,resp)=>{
  resp.render("../ejs_display/Teacher_Add_Student.ejs",{error:""})
}
exports.save_student=(req,resp)=>{

        let data = req.body
        const errors = validationResult(req);
        const alertarray=errors.array()
        console.log(errors)
        if(errors.isEmpty())
         {
             con.query("Insert into studentsdb set ?",data,(error,result)=>{
                 if(error){
                    resp.render("../ejs_display/Teacher_Add_Student.ejs",{error:"Rollno already exists"})
                
                 }
                 else if(result){
                    resp.redirect("/Add-Student")
                 }
             })
             }
            else{
                resp.render("../ejs_display/Teacher_Add_Student.ejs",{e:alertarray})
                
            }
       
        

}

exports.delete_students=(req,resp)=>{
    let rollno  = req.params.rollno;
    con.query("delete from studentsdb where Roll_no=?",rollno,(error,result)=>{
        
     
    })
    resp.redirect("/teacher-display")
    
}

exports.student_homepage=(req,resp)=>{
    resp.render("../ejs_display/Student_Login_Page.ejs")
}

exports.studentresult=(req,resp)=>{
    let data  = [req.body.rollno,req.body.dob]
    con.query("select * from studentsdb where Roll_no=? And Dob=?",data,(error,result)=>{
     if(result[0]!=""){
        resp.render("../ejs_display/Result_Display_Page.ejs",{userinfo:result})
     }else{
        resp.send("error")
     }
    
   })

}


exports.teacher_logout=(req,resp)=>{
    req.session.destroy();
 resp.redirect("/teacher-login")
}
exports.error=(req,resp)=>{
    resp.render("../ejs_display/login_error_message.ejs")
}



exports.savestudent=(req,resp)=>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return resp.status(422).jsonp(errors.array())
    }
}
