const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async(req,res,next)=>{

    //verify auth

    const {authorization} = req.headers

    if(!authorization){

        return res.status(401).json('auth token required')

    }

    //the authorization header looks like this 'brears qlweqrjqorrwqurqwporwqrqwrwq' =>
    //the second part is the token we need so we have to use split method to take the second string =>
    //we split the string where the space at and we got array with 2 strings
    const token = authorization.split(' ')[1]

    try{

       const {_id} = jwt.verify(token,process.env.JWT_PASSWORD)
       req.user = await User.findOne({_id}).select('_id')
       next()

    }catch(error){

        console.log(error)
        res.status(401).json({error:'requist is not auth'})

    }
    

}
module.exports = requireAuth