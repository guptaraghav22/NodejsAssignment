
$("#edit-student").submit((ans)=>{
     ans.preventDefault();

    var unindexedarray  = $("#edit-student").serializeArray();
    console.log(unindexedarray)
    var data={};
    $.map(unindexedarray,function(n,i){
        data[n['name']]=n['value']
    })
    console.log(data)
  
    var request = {
        "url":`/edit/${data.Roll_No}`,
        "method":"put",
        "data":data
    }
    
$.ajax(request).done(
    ()=>{
    
        alert("Data Updated Successfully") 
        console.log("Data Updated ") 
       
    
    }
)

})

// $("#add-student").submit((ans)=>{
//     //ans.preventDefault()
//     var unindexedarray  = $("#add-student").serializeArray();
//     var data={};
//     $.map(unindexedarray,function(n,i){
//         data[n['name']]=n['value']
//     })

//  console.log(data)
//     var request = {
//         "url":`/save_student`,
//         "method":"post",
//         "data":data
//     }
    
// $.ajax(request).done(
//     (response)=>{
    
//         // alert(response) 
        
       
    
//     })
   
// }

// )

if(window.location.pathname=="/teacher-display"){
    $ondelete = $(".table tbody td .delete")
    $ondelete.click(function(req,resp){
        
        var id  = $(this).attr("roll-no");
        var request = {
             "url":`/delete-student/${id}`,
             "method":"delete",
            
        }
        if(confirm("Do you still want to delete this student record")){
            $.ajax(request).done(
                ()=>{
                
                    
     
                
                })  
    
            
        }
    }) 
}