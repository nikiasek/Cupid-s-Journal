import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Signup () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const history=useNavigate();

    async function submit (e) {
        e.preventDefault()

        try {
            await axios.post("http://localhost:5000/auth/signup", {
                email, password, username
            })
            .then(res => {
                if(res.data === "exist") {
                    alert("User already exists")
                }
                else if(res.data === "notExist") {
                    history("/Home", {state:{id:email}})
                    localStorage.setItem("email", setEmail(email))
                    localStorage.setItem("loggedIn", true)                   
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
        <div className="SignupForm">
            <h1>Signup</h1>
            <form action="POST">
                <input type="email" onChange={(e) =>{setEmail(e.target.value)}} placeholder="email" name="" id="" />
                <input type="password" onChange={(e) =>{setPassword(e.target.value)}} name="password" id="" />
                <input type="text" onChange={(e) =>{setUsername(e.target.value)}} name="username" id="" />

                <input type="submit" onClick={submit} value="" />
            </form>
        </div>
    )
}

export default Signup