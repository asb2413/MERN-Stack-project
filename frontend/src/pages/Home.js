import { useEffect } from "react";
//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from "../components/WorkoutForm";
import {useWorkoutContext}from '../hooks/useWorkoutContext'
import { useAuthContext } from "../hooks/useAuthContext";


const Home = () => {

    const {workouts, dispatch} = useWorkoutContext()
    const {user} = useAuthContext()

    // fetch data from back end , and we use "proxy":"http://localhost:4000" in packge.json for acceses to the back end file
    
    useEffect(()=>{

        const fetchWorkouts = async ()=>{

            const res = await fetch('/api/workouts',{

                headers:{

                    'Authorization':`Bearer ${user.token}`
                }

            })
            const json = await res.json()
            
            if(res.ok){

                dispatch({type:'SET_WORKOUTS', payload: json})

            }
            

        }

        if(user){

            fetchWorkouts()

        }

        

    },[dispatch,user])

    return ( 

        <div className="home">

            

            <div className="workouts">

                {workouts && workouts.map((workout)=>(

                    <WorkoutDetails key={workout._id} workout={workout}/>

                ))}

            </div>

            <WorkoutForm/>

        </div>

     );
}
 
export default Home;