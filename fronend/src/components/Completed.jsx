import React from "react";
import classes from "../style/components/homeGrid.module.css";
import { FaListCheck ,FaRegCircleDot} from "react-icons/fa6";

const Completed = () => {
  return (
    <div className={classes.container}>
      <div className={classes.grid}>
        <div className={classes.gridItem}>
          <h2>
            Completed tasks <FaListCheck fill="#004953" />
          </h2>
          <ul className={classes.list}>
            <li className={classes.listItem}><FaRegCircleDot size="13px" />Complete Website Redesign
            </li>
            <li className={classes.listItem}><FaRegCircleDot size="13px" />Submit Marketing Campaign Strategy
            </li>
            <li className={classes.listItem}><FaRegCircleDot size="13px" />Resolve Customer Support Tickets
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Completed;
