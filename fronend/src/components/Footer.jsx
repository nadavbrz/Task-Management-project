import React from "react";
import classes from "../style/components/Footer.module.css";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className={classes.footerContainer}>
      <div className={classes.footerContent}>
        <div className={classes.footerSection}>
          <h2 className={classes.footerTitle}>Task Manager</h2>
          <p className={classes.footerText}>Make your life easier with Task Master</p>
        </div>
        <div className={classes.footerSection}>
          <h2 className={classes.footerTitle}>Useful Links</h2>
          <ul className={classes.linksList}>
            <li className={classes.linkItem}>
              <Link className={classes.link} to={"/about"}>About Us</Link>
            </li>
            <li className={classes.linkItem}>
              <Link className={classes.link} to={"/contact"}>Contact Us</Link>
            </li>
            <li className={classes.linkItem}>
              <Link className={classes.link} to={"/privacyPolicy"}>Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div className={classes.footerSection}>
          <h2 className={classes.footerTitle}>Follow Us</h2>
          <div className={classes.icons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaXTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className={classes.footerBottom}>
        <p className={classes.copy}>&copy; 2024 Task Master, All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
