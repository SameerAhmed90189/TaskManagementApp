import { useState } from "react";
import API from "../services/api";
import"../styles/Login.css";

function Login()
{
    const [email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const handleSubmit= async(e)=>
    {
        e.preventDefault();
        try{
            const response= await API.post(
                "/auth/login",
                {
                    emai,
                    password
                }
            );
            localStorage.setItem("token",
            response.data.token);
            alert("Login Successful");
        }
        catch(error)
        {
            alert(
                error.response?.data?.message || "Login Failed"
            );
        }


    };
    return(
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }/>

                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>
                    setPassword(e.target.value)
                }
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;