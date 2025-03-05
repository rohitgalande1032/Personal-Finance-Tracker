import React, { use, useState } from 'react'
import "./styles.css"
import Input from "../input/Input"
import Button from '../Button/Button'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, doc, setDoc } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { getDoc } from 'firebase/firestore'


const SignupSignin = () => {
  const [name,setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] =useState("")
  const [loading, setLoading] = useState(false)
  const [loginForm, setLoginForm] = useState()

  const navigate = useNavigate()

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
          createDoc(user)//pass user when sign up

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

  //login function
  function loginUsingEmail() {
    console.log("Email", email)
    console.log("Password", password)
    setLoading(true)

    if(email!="" && password!=""){
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        toast.success("User Logged In!")
        console.log("User Logged In", user)
        setLoading(false)
        navigate("/dashboard")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage)
        setLoading(false)
      });
    }else{
      toast.error("All fields are required!")
      setLoading(false)
    }
    
  }

  //create doc
  async function createDoc(user) {
    setLoading(true)
    //make sure that the doc with the uid dosen't exist
    if(!user) return

    const userRef = doc(db, "users", user.uid)
    const userData = await getDoc(userRef)
    if(!userData.exists()){
      try {
        await setDoc(doc(db, "user", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        })
        toast.success("Doc created!")
        setLoading(false)
      } catch (error) {
        toast.error(error.message)
        setLoading(false)
      }
    }else{
      toast.error("Doc already exists")
      setLoading(false)
    }

  }

  return (
    <>
    {loginForm ? <div className='signup-wrapper'>
      <h2 className='title' >
        Login on <span style={{color: "var(--theme)"}}>financely.</span>
      </h2>
      <form>
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

        <Button disabled={loading} text={loading? "Loading":"Login Using Email and Password"} onClick={loginUsingEmail}/>
        <p style={{textAlign:"center", margin: "0"}}>or</p>
        <Button text={loading? "Loading..." : "Login Using Google"} blue={true}/>
        <p style={{textAlign:"center", margin: "0", fontWeight:"300", fontSize:"0.8rem", cursor:"pointer"}}
        onClick={()=>setLoginForm(!loginForm)}>Or Don't Have An Account? <span style={{color: "var(--theme)"}}>Click Here.</span></p>
      </form>
      </div>  : 
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
        <p style={{textAlign:"center", margin: "0", fontWeight:"300", fontSize:"0.8rem", cursor:"pointer"}}
        onClick={()=>setLoginForm(!loginForm)}>Or Have An Account? <span style={{color: "var(--theme)"}}>Click Here.</span></p>
      </form>
    </div>}
    </>
  )
}

export default SignupSignin