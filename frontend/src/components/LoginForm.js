import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history=useNavigate();

    async function submit (e) {
        e.preventDefault()

        try {
            await axios.post("http://localhost:5000/login", {
                email, password
            })
            .then(res => {
                if(res.data === "exist") {
                    history("/Home", {state:{id:email}})
                    localStorage.setItem("email", email)
                    localStorage.setItem("loggedIn", true)           
                }
                else if(res.data === "notExist") {
                    alert("Wrong credentials")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e)
            })
        }
        catch(e) {
            console.log(e)
        }
    }

    return (
        <div className="loginForm">
            <h1>Login</h1>
            <form action="POST">
                <input type="email" onChange={(e) =>{setEmail(e.target.value)}} placeholder="email" name="" id="" />
                <input type="password" onChange={(e) =>{setPassword(e.target.value)}} name="password" id="" />

                <input type="submit" onClick={submit} value="" />
            </form>
        </div>
    )
}

export default Login