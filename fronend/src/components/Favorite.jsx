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
            <li className={classes.listItem}><FaRegCircleDot size="13px" />Research New Project Management Tools</li>
            <li className={classes.listItem}><FaRegCircleDot size="13px" />Plan Annual Budget Review</li>
            <li className={classes.listItem}><FaRegCircleDot size="13px" />Update Team Onboarding Manual</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Favorite;
