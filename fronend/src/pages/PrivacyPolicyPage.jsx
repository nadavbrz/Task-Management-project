// src/pages/PrivacyPolicy.js
import React from "react";
import { Helmet } from "react-helmet-async";
import classes from "../style/pages/PrivacyPolicyPage.module.css";

const PrivacyPolicyPage = () => {
  return (
    <div className={classes.privacyContainer}>
      <Helmet>
        <title>Privacy Policy - Task Master</title>
      </Helmet>

      <div className={classes.privacyContent}>
        <h1 className={classes.header}>Privacy Policy</h1>

        <p className={classes.intro}>
          At <strong>Task Master</strong>, your privacy is of utmost importance
          to us. This Privacy Policy explains the types of information we
          collect, how we use it, and your rights regarding your personal data.
        </p>

        <div className={classes.section}>
          <h2 className={classes.subHeader}>Information We Collect</h2>
          <p>
            We may collect personal information in the following categories:
          </p>
          <ul className={classes.list}>
            <li>Personal Information (e.g., name, email address)</li>
            <li>Task-related data (tasks created and managed)</li>
            <li>Usage data (e.g., your interaction with the platform)</li>
          </ul>
        </div>

        <div className={classes.section}>
          <h2 className={classes.subHeader}>How We Use Your Information</h2>
          <p>We use the data we collect to:</p>
          <ul className={classes.list}>
            <li>Enhance your task management experience</li>
            <li>Provide customer support</li>
            <li>Improve the platform through usage analysis</li>
          </ul>
        </div>

        <div className={classes.section}>
          <h2 className={classes.subHeader}>Data Protection</h2>
          <p>
            We implement advanced security measures to protect your data from
            unauthorized access, ensuring your information remains confidential.
          </p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.subHeader}>Your Rights</h2>
          <p>You have the right to:</p>
          <ul className={classes.list}>
            <li>Access, correct, or delete your personal data</li>
            <li>Object to how we process your data</li>
          </ul>
        </div>

        <div className={classes.section}>
          <h2 className={classes.subHeader}>Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. You will be notified of
            any changes via our website.
          </p>
        </div>

        <p className={classes.lastUpdated}>Last Updated: September 6, 2024</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
