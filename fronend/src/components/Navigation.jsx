import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "../style/components/Navigation.module.css";
import { FaHome } from "react-icons/fa";
import {
  FaHeart,
  FaCircleUser,
  FaInbox,
  FaStopwatch,
  FaListCheck,
  FaTruckFast,
} from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";

const Navigation = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Parse the user object from localStorage

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header>
        <nav className={classes.nav}>
          <ul className={classes.navList}>
            <li className={classes.navItem}>
              <Link className={classes.navLink} to={"/"}>
                {dimensions.width < 590 ? <FaHome size="25px" /> : "Home"}
              </Link>
            </li>
            <li className={classes.navItem}>
              <Link className={classes.navLink} to={"/dashboard"}>
                {dimensions.width < 590 ? <FaInbox size="25px" /> : "Dashboard"}
              </Link>
            </li>
            <li className={classes.navItem}>
              <Link className={classes.navLink} to={"/futureTask"}>
                {dimensions.width < 590 ? (
                  <FaStopwatch size="25px" />
                ) : (
                  "Futures"
                )}
              </Link>
            </li>
            <li className={classes.navItem}>
              <Link className={classes.navLink} to={"/priority"}>
                {dimensions.width < 590 ? (
                  <FaTruckFast size="25px" />
                ) : (
                  "Priority"
                )}
              </Link>
            </li>
            <li className={classes.navItem}>
              <Link className={classes.navLink} to={"/completedTask"}>
                {dimensions.width < 590 ? (
                  <FaListCheck size="25px" />
                ) : (
                  "Completed"
                )}
              </Link>
            </li>
            <li className={classes.navItem}>
              <Link className={classes.navLink} to={"/favoriteTask"}>
                {dimensions.width < 590 ? <FaHeart size="25px" /> : "Favorite"}
              </Link>
            </li>
            {!user && (
              <li className={classes.navItem}>
                <Link className={classes.navLink} to={"/logIn"}>
                  <FaCircleUser  size="25px" />
                </Link>
              </li>
            )}
            {user && (
              <li className={classes.navItem}>
                <Link className={classes.navLink} to={"/profile"}>
                  <FaCircleUser  size="25px" />
                </Link>
              </li>
            )}
            {user?.email === "nadav@gmail.com" && (
              <li className={classes.navItem}>
                <Link className={classes.navLink} to={"/adminPanel"}>
                {dimensions.width < 590 ? <MdAdminPanelSettings size="25px" /> : "Admin"}
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navigation;
