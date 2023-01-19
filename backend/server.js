require('dotenv').config()

const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
const express = require('express')
const router = require('./routes/workouts')

//express app
const app = express()

//middleware

//express.json method allow us to take req data from the body
app.use(express.json())
app.use((req,res,next)=>{

    console.log(req.path,req.method)
    next()

})

//routes
app.use('/api/workouts',router)


//db connnection

mongoose.connect(process.env.MONGO_URI).then(()=>{ 


    console.log('db is connected')
    //listen
    app.listen(process.env.PORT, ()=>{console.log("listening to prot ", process.env.PORT)})


 }).catch((err)=>{console.log(err)})



