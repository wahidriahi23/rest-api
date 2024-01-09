const mongoose=require ("mongoose")
const contactSchema=mongoose.Schema({
    name:String,
    email:{type:String,required:true},
    number:Number,
    address:String,

})
const Contact=mongoose.model("contact",contactSchema)
module.exports=Contact