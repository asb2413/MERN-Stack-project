import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = ()=>{

    const {user} = useAuthContext()
    const {logout} = useLogout()
    
    const handleClick = ()=>{

        logout()

    }


    return(

        <header>

        <div className="navbar">

            <Link to="/"><h1>Workout body</h1></Link>
            <nav>

                {user && (
                
                <div className="logout">
                <span>{user.email}</span>
                <button onClick={handleClick}>Log out</button>
                </div>
                
                )}
                
                {!user && ( 
                <div>
                    <Link to='/signup'>Signup</Link>
                    <Link to='/login'>Login</Link>
                </div>)}
               
            </nav>

        </div>

        </header>
    )

}

export default Navbar;