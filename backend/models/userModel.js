const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({

    email:{

        type:String,
        required:true,
        unique: true
        
    },

    password:{

        type:String,
        required:true

    }

    

}, {timestamps:true})


//static method for signup

userSchema.statics.signup = async function(email,password){

    if(!email || !password){

        throw Error('All fillds must be filled')

    }

    if(!validator.isEmail(email)){

        throw Error('The email is not valid')

    }

    if(!validator.isStrongPassword(password)){

        throw Error('The password is not strong') 

    }

    const exsits = await this.findOne({email})
    if(exsits){

        throw Error('email alredy used')

    }


    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return user

}

//static method for login

userSchema.statics.login = async function(email,password){

    if(!email || !password){

        throw Error('All fillds must be filled')

    }

    const user = await this.findOne({email})
    if(!user){

        throw Error('Incorrect email')

    }

    const match = await bcrypt.compare(password,user.password)

    if(!match){

        throw Error('Incorrect password')

    }

    return user

}

module.exports = mongoose.model('User',userSchema)