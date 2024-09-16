import React from "react";
import classes from "../style/components/DeleteAndBackButtons.module.css";
import { deleteTask } from "../slices/taskSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const DeleteAndBackButtons = ({ taskId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDeleteTask = () => {
    dispatch(deleteTask(( taskId )))
      .then(() => navigate("/dashboard"))
      .catch((err) => console.error("Error deleting task:", err));
  };
  return (
    <div className={classes.btn_box}>
      <button
        className={classes.back_btn}
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </button>
      <button className={classes.delete_btn} onClick={handleDeleteTask}>
        Delete task
      </button>
    </div>
  );
};

export default DeleteAndBackButtons;
