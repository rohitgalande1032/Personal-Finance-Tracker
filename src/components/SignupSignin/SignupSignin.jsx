import React, { useState } from 'react'
import "./styles.css"
import Input from "../input/Input"
import Button from '../Button/Button'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase'


const SignupSignin = () => {
  const [name,setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] =useState("")
  const [loading, setLoading] = useState(false)

  function signUpWithEmail() {
    setLoading(true)
    console.log("Name: ", name)
    console.log("Email ", email)
    console.log("Password", password)
    console.log("confirmPassword", confirmPassword)
    //Authenticate User, or basically create a new account using email and password

    if(name != "" && email!="" && password!="" && confirmPassword!=""){
      if(password == confirmPassword){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log("User--->", user)
          toast.success("User Created Successfully!")
          setLoading(false)
          setName("")
          setEmail("")
          setPassword("")
          setConfirmPassword("")
          createDoc(user)

          //Create a doc with user id as the following id
          //
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage)
          setLoading(false)
        });
      }else{
        toast.error("Password and Confirm Password don't match!")
        setLoading(false)
      }
    }else{
      toast.error("All fields are required?")
      setLoading(false)
    }
  }

  //create doc
  function createDoc(user) {

  }

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
        type={"email"}
        label={"Email"} 
        placeholder={"Enter email"} 
        state={email} 
        setState={setEmail}
        />

        <Input 
        type={"password"}
        label={"Password"}
        placeholder={"Enter Password"}
        state={password}
        setState={setPassword}
        />

        <Input 
        type={"password"}
        label={"Confirm Password"} 
        placeholder={"Re-enter password"} 
        state={confirmPassword} 
        setState={setConfirmPassword}
        />

        <Button disabled={loading} text={loading? "Loading":"Signup Using Email and Password"} onClick={signUpWithEmail}/>
        <p style={{textAlign:"center", margin: "0"}}>or</p>
        <Button text={loading? "Loading..." : "Signup Using Google"} blue={true}/>
      </form>
    </div>
  )
}

export default SignupSignin