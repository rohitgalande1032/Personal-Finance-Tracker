import React from 'react'
import notransaction from "../../assets/notransaction.png"

const NoTransactions = () => {
  return (
    <div style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        flexDirection:"column",
        marginBottom:"2rem"
    }}>
        <img src={notransaction} style={{width:"400px", margin:"4rem"}}/>
        <p style={{textAlign:"center", fontSize:"1.2rem"}}>
            You Have No Transaction Currently
        </p>
    </div>
  )
}

export default NoTransactions