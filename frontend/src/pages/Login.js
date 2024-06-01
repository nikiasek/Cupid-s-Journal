import React from 'react'
import LoginForm from '../components/LoginForm'
import SignupForm from "../components/SignupForm"

const Login = () => {
  return (
    <div>
        <LoginForm />
        <p>OR</p>
        <SignupForm />
    </div>
  )
}

export default Login
