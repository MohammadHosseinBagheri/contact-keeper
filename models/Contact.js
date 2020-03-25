const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'users'
    },
    name:{
        type:String ,
        require:true
    } ,
    lastname:{
        type:String ,
        require:true
    } ,
    email:{
        type:String ,
        require:true
    } ,
    phonenumber:{
        type:String ,
        require:true
    } ,
    type:{
        type:String ,
        default:'personal'
    } ,
    date:{
        type:Date ,
        default:Date.now()
    }
})

module.exports = mongoose.model('contact' , ContactSchema)