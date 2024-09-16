import React from "react";
import classes from "../style/components/homeGrid.module.css";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaRegCircleDot } from "react-icons/fa6";

const Account = () => {
  return (
    <div className={classes.container}>
      <div className={classes.grid}>
        <div className={classes.gridItem}>
          <h2>
            Account Management <RiAccountCircleFill />
          </h2>
          <ul>
            <li className={classes.listItem}>
              <FaRegCircleDot size="13px" /> Manage your account information
            </li>
            <li className={classes.listItem}>
              <FaRegCircleDot size="13px" /> View your tasks history
            </li>
            <li className={classes.listItem}>
              <FaRegCircleDot size="13px" /> Manage Your Task easier
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Account;
