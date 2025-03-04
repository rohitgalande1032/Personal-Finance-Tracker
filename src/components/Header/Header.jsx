import React from 'react'
import "./styles.css"

function logoutFun() {
  alert("Logout")
}

const Header = () => {
  return (
    <div className='navbar'>
      <p className='logo'>Financely.</p>
      <p className='logo link' onClick={logoutFun}>Logout</p>
    </div>
  )
}

export default Header