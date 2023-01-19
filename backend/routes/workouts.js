const express = require('express')
const {createWorkOut ,getWorkOuts,getSingleWorkOut,deleteWorkOut,updateWorkOut} = require('../controllers/workoutContoller')
const router =express.Router()

//Get all workouts
router.get('/',getWorkOuts)

//Get a single workout

router.get('/:id', getSingleWorkOut)

router.post('/', createWorkOut)

router.delete('/:id', deleteWorkOut)

router.patch('/:id', updateWorkOut)

module.exports = router