import React, { useEffect } from 'react'
import "./styles.css"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate()

  useEffect(()=> {
    if(user){
      navigate("/dashboard")
    }
  }, [user, loading])


  function logoutFun() {
    signOut(auth).then(()=> {
      toast.success("Sign Out successful")
      navigate("/")
    }).catch((error) => {
      toast.error(error.message)
    })
  }
  return (
    <div className='navbar'>
      <p className='logo'>Financely.</p>

      {/* If user is there then show logout */}
      {user &&(
      <p className='logo link' onClick={logoutFun}>Logout</p>
      )}
    </div>
  )
}

export default Header