import { useNavigate } from "react-router-dom"
import React, { useEffect } from 'react'
import classes from"../style/components/ProtectedRoute.module.css"
const ProtectedRoute = ({children}) => {
    const user = localStorage.getItem("user")
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user){
            navigate("/login")
        }
    },[user, navigate])
  return (
    <>
    {user ?  <main className={classes.container}>{children}</main> :null}
    </>
  )
}

export default ProtectedRoute