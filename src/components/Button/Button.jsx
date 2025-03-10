import React from 'react'
import "./styles.css"

const Button = ({text, onClick, blue, disabled}) => {
  return (
    <div 
    onClick={onClick} 
    className={blue ? "btn btn-blue" : "btn"} 
    disabled={disabled}
    >
      {text}
    </div>
  )
}

export default Button