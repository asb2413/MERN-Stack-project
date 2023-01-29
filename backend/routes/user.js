const { loginUser,signupUser} =require('../controllers/userController') 
const express = require('express')
const userRouter = express.Router()


//login route

userRouter.post('/login', loginUser)


//singup route
 
userRouter.post('/signup', signupUser)



module.exports = userRouter