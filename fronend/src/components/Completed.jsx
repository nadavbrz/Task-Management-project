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
            <li className={classes.listItem}><FaRegCircleDot size="13px" />Finished reading a novel
            </li>
            <li className={classes.listItem}><FaRegCircleDot size="13px" />Completed gym session
            </li>
            <li className={classes.listItem}><FaRegCircleDot size="13px" />Organized kitchen pantry
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Completed;
