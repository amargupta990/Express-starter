const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true ,"first name is reruired"],
        minlength:[5, "first name should be min 5 character"],
        lowercase: true,
        trim:true,
        maxlength:[20,"first length should be less than 20 char"]
    },
    lastName:{
        type:String,
        required:[true ,"first name is reruired"],
        minlength:[5, "first name should be min 5 character"],
        lowercase: true,
        trim:true,
        maxlength:[20,"first length should be less than 20 char"]
    },
    mobileNumber:{
        type:String,
        trim:true,
        unique:[true ,"phone number should be unique"],
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:[true , "email required"],
        unique:[true, "email must be unnique"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[6,"password must be  6 char long"],
        
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},{
    timestamps:true,
})

userSchema.pre('save', async function () {
    const hashedpassword =await bcrypt.hash(this.password,10)
    this.password=hashedpassword
})

const User = mongoose.model("User", userSchema);

module.exports=User;