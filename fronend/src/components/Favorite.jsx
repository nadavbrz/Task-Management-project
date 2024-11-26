import React from "react";
import classes from "../style/components/homeGrid.module.css";
import { FaHeart ,FaRegCircleDot} from "react-icons/fa6";

const Favorite = () => {
  return (
    <div className={classes.container}>
      <div className={classes.grid}>
        <div className={classes.gridItem}>
          <h2>
            Favorite tasks <FaHeart fill="#004953" />
          </h2>
          <ul className={classes.list}>
            <li className={classes.listItem}><FaRegCircleDot size="13px" />Call a close friend</li>
            <li className={classes.listItem}><FaRegCircleDot size="13px" />Watch favorite TV series</li>
            <li className={classes.listItem}><FaRegCircleDot size="13px" />Read inspiring book chapters</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Favorite;
