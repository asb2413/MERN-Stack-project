import { useState } from "react"
import {useWorkoutContext} from '../hooks/useWorkoutContext'
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutForm = () => {
    const {dispatch} = useWorkoutContext()
    const [title, setTitle] = useState("")
    const [repetition, setRepetition] = useState("")
    const [load, setLoad] = useState('')
    const [error, setError] = useState(null)
    const [emptyFilds, setEmptyFilds] = useState([])
    const {user} = useAuthContext()

    const handleSubmit = async(e)=>{
        e.preventDefault()

        if(!user){

            setError('you must be logged in')
            return

        }

        const workout = {

            title,
            repetition,
            load

        }

        const res = await fetch('/api/workouts', 
        
        {
            
            method:'POST',
            body:JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`
            }
            })

            const json = await res.json()
            if(!res.ok){

                setError(json.error)
                setEmptyFilds(json.emptyFilds)
                

            }

            if(res.ok){
                
                setTitle('')
                setRepetition('')
                setLoad('')
                setError(null)
                setEmptyFilds([])
                console.log('new workout added',json)
                dispatch({type:'CREATE_WORKOUTS', payload: json})

            }

    }



    return ( 

        <div className="workout-form">

            <form  onSubmit={handleSubmit}>

                <h3>Add new workout</h3>
                <label>Enter the type</label>
                <input type="text" onChange={(e)=>{setTitle(e.target.value)}} 
                 value={title}
                 className={emptyFilds.includes('title')? 'error':''}
                />

                <label>Repetition</label>
                <input type="text" onChange={(e)=>{setRepetition(e.target.value)}} 
                 value={repetition}
                 className={emptyFilds.includes('repetition')? 'error':''}
                 />

                <label>Load</label>
                <input type="text" onChange={(e)=>{setLoad(e.target.value)}} 
                 value={load}
                 className={emptyFilds.includes('load')? 'error':''}
                />

                <button>Add workout</button>
                {error && <div className="error">{error}</div>}

            </form>

        </div>

     );
}
 
export default WorkoutForm;