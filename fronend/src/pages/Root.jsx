import React from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import classes from "../style/components/Root.module.css"; 

const Root = () => {
  return (
<div className={classes.pageContainer}>
      <Navigation />
      <main className={classes.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Root