import {useAuthContext} from './useAuthContext'
import { useState } from 'react'

export const useLogin = ()=>{

    const [error, setError] = useState(null)
    const [isLoad, setIsload] = useState(null)
    const {dispatch}= useAuthContext()

    const login = async (email,password)=>{

        setIsload(true)
        setError(null)

        const res = await fetch('/api/user/login',{

            method: 'POST',
            headers: {'Content-type': 'application/json' },
            body:JSON.stringify({email,password})

        })

        const json = await res.json()

        if(!res.ok){

            setIsload(false)
            setError(json.error)

        }

        if(res.ok){
            // save user to local storage

            localStorage.setItem('user',JSON.stringify(json))

            //update the auth context

            

            dispatch({type:'LOGIN',payload:json})

            setIsload(false)

            

        }

    }

    return {login,isLoad,error}

}