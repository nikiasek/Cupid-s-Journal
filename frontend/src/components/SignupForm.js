import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Signup () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history=useNavigate();

    async function submit (e) {
        e.preventDefault()

        try {
            await axios.post("http://localhost:5000/signup", {
                email, password
            })
            .then(res => {
                if(res.data === "exist") {
                    alert("User alreadyd exists")
                }
                else if(res.data === "not exist") {
                    history("/Home", {state:{id:email}})
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

                <input type="submit" onClick={submit} value="" />
            </form>
        </div>
    )
}

export default Signup