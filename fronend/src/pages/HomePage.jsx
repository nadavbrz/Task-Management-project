import React from "react";
import classes from "../style/pages/HomePage.module.css";
import Future from "../components/Future";
import Favorite from "../components/Favorite";
import Priority from "../components/Priority";
import Completed from "../components/Completed";
import Account from "../components/Account";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <div className={classes.pageContainer}>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <h1 className={classes.pageTitle}>Welcome to Task Master</h1>
      <div className={classes.itemsBox}>
        <div className={classes.row}>
            <Future />
          <Favorite />
            <Priority />
          
          
        </div>
        <div className={classes.row}>
          <Account />
          <Completed />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
