import React from "react";
import classes from "../style/components/homeGrid.module.css";
import { FaTruckFast, FaRegCircleDot } from "react-icons/fa6";

const Priority = () => {
  return (
    <div className={classes.container}>
      <div className={classes.grid}>
        <div className={classes.gridItem}>
          <h2>
            Priority tasks <FaTruckFast fill="#004953" />
          </h2>
          <ul className={classes.list}>
            <li className={classes.listItem}>
              <FaRegCircleDot size="13px" />
              Prepare Client Presentation
            </li>
            <li className={classes.listItem}>
              <FaRegCircleDot size="13px" />
              Fix Critical Bug in Software
            </li>
            <li className={classes.listItem}>
              <FaRegCircleDot size="13px" />
              Submit Quarterly Report
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Priority;
