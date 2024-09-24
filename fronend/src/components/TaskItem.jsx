import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTask, updateTask } from "../slices/taskSlice";
import classes from "../style/components/TaskItem.module.css";
import {
  FaHeart,
  FaListCheck,
  FaRegTrashCan,
  FaStopwatch,
  FaTruckFast,
} from "react-icons/fa6";

function TaskItem({ task }) {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [status, setStatus] = useState({
    completed: task.completed,
    future: task.future,
    priority: task.priority,
    favorite: task.favorite,
  });

  useEffect(() => {
    dispatch(updateTask({ id: task._id, taskData: status }));
  }, [status]);

  const handleStatusChange = (key) => {
    if (key === "favorite") {
      setStatus((prev) => ({ ...prev, favorite: !prev.favorite }));
    } else {
      setStatus((prev) => ({
        ...prev,
        completed: key === "completed" ? !prev.completed : false,
        future: key === "future" ? !prev.future : false,
        priority: key === "priority" ? !prev.priority : false,
      }));
    }
  };

  return (
    <li className={classes.taskItem}>
      <button
        onClick={() => navigate(`/tasks/${task._id}`)}
        className={classes.taskDetailsBtn}
      >
        {task.title}
      </button>
      <div className={classes.statusIcons}>
        {[
          {
            key: "future",
            icon: FaStopwatch,
            color: "#004953",
            tooltip: "Future Task",
          },
          {
            key: "priority",
            icon: FaTruckFast,
            color: "#6F4E37",
            tooltip: "Priority Task",
          },
          {
            key: "completed",
            icon: FaListCheck,
            color: "#40826D",
            tooltip: "Completed Task",
          },
          {
            key: "favorite",
            icon: FaHeart,
            color: "#DE5D83",
            tooltip: "Favorite Task",
          },
        ].map(({ key, icon: Icon, color, tooltip }) => (
          <div key={key} className={classes.tooltipContainer}>
            <button
              onClick={() => handleStatusChange(key)}
              className={classes.statusBtn}
            >
              <Icon fill={status[key] ? color : "#B2BEB5"} size="35px" />
            </button>
            <span className={classes.tooltipText}>{tooltip}</span>
          </div>
        ))}
      </div>
      <div className={classes.tooltipContainer}>
        <button
          onClick={() => dispatch(deleteTask(task._id))}
          className={classes.deleteTaskBtn}
        >
          <FaRegTrashCan fill="#FF0800" size="35px" />
        </button>
        <span className={classes.tooltipText}>Delete Task</span>
      </div>
    </li>
  );
}

export default TaskItem;
