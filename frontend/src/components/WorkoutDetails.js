import {useWorkoutContext}from '../hooks/useWorkoutContext'

//date NFS

import dateFormat from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workout}) => {

   const {dispatch} = useWorkoutContext()

   const handleClick = async ()=>{

    

        const res = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })

        const json = await res.json()

        if(!res.ok){

            console.log('respons 404')

        }

        if(res.ok){

           
           dispatch({type: 'DELETE_WORKOUT', payload: json.workout._id})
           
           
        }

   }

    return ( 

        <div className="workout-details">
            
            <h1>{workout.title}</h1>
            <p><strong>Load (KG): </strong>{workout.load}</p>
            <p><strong>repetition (times): </strong>{workout.repetition}</p>
            <p>{dateFormat(new Date(workout.createdAt),{addSuffix:true})}</p>
            <span className="material-symbols-outlined icon" onClick={handleClick}>delete</span>
        </div>

     );
}
 
export default WorkoutDetails;