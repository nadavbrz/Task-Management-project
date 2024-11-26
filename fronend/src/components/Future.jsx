import React from "react";
import classes from "../style/components/homeGrid.module.css";
import { FaStopwatch, FaRegCircleDot } from "react-icons/fa6";

const Future = () => {
  return (
    <div className={classes.container}>
      <div className={classes.grid}>
        <div className={classes.gridItem}>
          <h2>
            Future tasks <FaStopwatch fill="#004953" />
          </h2>
          <ul className={classes.list}>
            <li className={classes.listItem}>
              <FaRegCircleDot size="13px" />
              Research New Project Manager
            </li>
            <li className={classes.listItem}>
              <FaRegCircleDot size="13px" />
              Plan Annual Budget Review
            </li>
            <li className={classes.listItem}>
              <FaRegCircleDot size="13px" />
              Update Team Manual
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Future;
