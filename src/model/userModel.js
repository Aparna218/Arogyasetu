const mongoose= require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        trim:true
    },
    lastName:{
        type:String,
        require:true,
        trim:true
    },
    phoneNumber:{
        type:String,
        require:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    age:{
        type:Number,
        require:true,
        trim:true
    },
    pinCode:{
        type:Number,
        require:true,
        trim:true
    },
    adharNo:{
        type:String,
        require:true,
        unique:true,
        trim:true
    }
},
{timestamps:true}
)

module.exports = model("user",userSchema)