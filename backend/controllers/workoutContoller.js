const Workout = require('../models/workoutsModel')
const mongoose = require('mongoose')

//Get all workouts

const getWorkOuts = async (req,res)=>{

    const user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({createdAt: -1})
    res.status(200).json(workouts)

}

//Get a single workout

const getSingleWorkOut = async (req,res)=>{

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){

       return res.status(404).json({error:"No such workout" })

    }

    const workouts = await Workout.findById(id)

    if(!workouts){

            return res.status(404).json({error: "No such workout"})

    }

    res.status(200).json(workouts)

}


//Create new workout

const createWorkOut = async (req,res)=>{

    const {title ,repetition, load} = req.body

   let emptyFilds = []

   if(!title){emptyFilds.push('title')}

   if(!repetition){emptyFilds.push('repetition')}

   if(!load){emptyFilds.push('load')}

   if(emptyFilds.length > 0){

        return res.status(400).json({error:'pls fill all the fields',emptyFilds})

   }

    try{
        
        const user_id = req.user._id
        const workout = await Workout.create({title,repetition,load,user_id})
        res.status(200).json(workout)
    
    }catch(err){
        
        res.status(400).json({error:err.message})

    }
    

}

//Delete wourkout

const deleteWorkOut = async (req,res)=>{

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){

        return res.status(404).json({error:"No such workout" })
 
     }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){

        return res.status(404).json({error: "No such workout"})

    }

    

    res.status(200).json({workout})

}

//update workout

const updateWorkOut = async (req,res)=>{

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){

        return res.status(404).json({error:"No such workout" })
 
     }

    const workout = await Workout.findOneAndUpdate({_id: id},{

        ...req.body

    })

    if(!workout){

        return res.status(404).json({error: "No such workout"})

    }

    

    res.status(200).json({workout})

}

//exports

module.exports = {

    createWorkOut,
    getWorkOuts,
    getSingleWorkOut,
    deleteWorkOut,
    updateWorkOut

}