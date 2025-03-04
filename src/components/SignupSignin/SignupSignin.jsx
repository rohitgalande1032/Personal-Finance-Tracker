import React, { useState } from 'react'
import "./styles.css"
import Input from "../input/Input"
import Button from '../Button/Button'

const SignupSignin = () => {
  const [name,setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] =useState("")
  return (
    <div className='signup-wrapper'>
      <h2 className='title' >
        Sign Up on <span style={{color: "var(--theme)"}}>financely.</span>
      </h2>
      <form>
        <Input 
        label={"First Name"} 
        placeholder={"John Deo"} 
        state={name} 
        setState={setName}
        />

        <Input 
        label={"Email"} 
        placeholder={"Enter email"} 
        state={email} 
        setState={setEmail}
        />

        <Input 
        label={"Password"}
        placeholder={"Enter Password"}
        state={password}
        setState={setPassword}
        />

        <Input 
        label={"Confirm Password"} 
        placeholder={"Re-enter password"} 
        state={confirmPassword} 
        setState={setConfirmPassword}
        />

        <Button text={"Signup Using Email and Password"}/>
        <p style={{textAlign:"center", margin: "0"}}>or</p>
        <Button text={"Signup Using Google"} blue={true}/>
      </form>
    </div>
  )
}

export default SignupSignin