const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongooseSchema({
    name:{
        type:String,
        required:[true,"Please enter Name"],
        maxLength:[30,"Name cannot be more than 30 characters"],
        minLength:[3,"Name cannot be less than 3 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter Email"],
        unique:true,
        validate:[validator.isEmail,"Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please enter Password"],
        minLength:[8,"Password cannot be less than 8 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

})

module.exports = mongoose.model('User',userSchema)