const mongoose=require('mongoose');


const AdminSchema= new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            min:4,
            unique:true,
        },
        password:{
            type:String ,
            required:true
        }
        
    
})
let AdminModel=mongoose.model("Admin scheema",AdminSchema);;
module.exports=AdminModel;