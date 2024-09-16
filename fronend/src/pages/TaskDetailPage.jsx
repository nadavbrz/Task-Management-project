import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTask } from "../slices/taskSlice";
import { useParams } from "react-router-dom";

import classes from "../style/pages/TaskDetailPage.module.css";
import DeleteAndBackButtons from "../components/DeleteAndBackButtons";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "Invalid date" : date.toISOString().split('T')[0];
};

const TaskDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { task, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTask(id));
  }, [dispatch, id]);

  if (loading) return <p className={classes.loading}>Loading task...</p>;

  const errorMessage = error
    ? typeof error === "object"
      ? JSON.stringify(error)
      : error
    : null;
  if (errorMessage)
    return <p className={classes.error}>Error: {errorMessage}</p>;

  

  return (
    <div className={classes.taskDetailContainer}>
      <div className={classes.taskHeader}>
        <h1 className={classes.title}>{task.title}</h1>
      </div>
      <p className={classes.description}>{task.description}</p>
      <ul className={classes.taskDetailsList}>
        <li>
          <strong>Completed:</strong> {task.completed ? "Yes" : "No"}
        </li>
        <li>
          <strong>Priority:</strong> {task.priority ? "Yes" : "No"}
        </li>
        <li>
          <strong>Future:</strong> {task.future ? "Yes" : "No"}
        </li>
        <li>
          <strong>Favorite:</strong> {task.favorite ? "Yes" : "No"}
        </li>
        <li>
        <strong>Created At:</strong> {formatDate(task.createdAt)}
        </li>
      </ul>
     <DeleteAndBackButtons taskId={task._id}/>
    </div>
  );
};

export default TaskDetailPage;
