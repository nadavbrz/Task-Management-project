import React from "react";
import { Link } from "react-router-dom";
import classes from "../style/pages/ErrorPage.module.css";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  return (
    <div className={classes.error}>
      <Helmet>
        <title>Error Page</title>
      </Helmet>
      <div className={classes.content}>
        <h1 className={classes.errorHeader}>404</h1>
        <h2 className={classes.errorSubHeader}>Page Not Found</h2>
        <p className={classes.errorP}>
          Oops! The page you are looking for doesn't exist. It might have been
          moved or deleted.
        </p>
        <Link to="/" className={classes.homeButton}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
