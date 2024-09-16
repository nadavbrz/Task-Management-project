import React, { useEffect, useState } from "react";
import { FaTruckFast } from "react-icons/fa6";
import { fetchTasks, updateTask } from "../slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import classes from "../style/pages/TaskStatus.module.css";
import DeleteAndBackButtons from "../components/DeleteAndBackButtons";

const PriorityPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [priorityTasks, setPriorityTasks] = useState([]);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (tasks) {
      setPriorityTasks(tasks.filter((task) => task.priority === true));
    }
  }, [tasks]);

  const handleDeselect = (taskId) => {
    const updatedTask = tasks.find((task) => task._id === taskId);
    if (updatedTask) {
      dispatch(updateTask({ id: taskId, taskData: { ...updatedTask, priority: false } })).then(() => {
        dispatch(fetchTasks());
      });
    }
  };

  const navigateToTask =(taskId)=>{
    navigate(`/tasks/${taskId}`)
  } 

  return (
    <div className={classes.pageContainer}>
      <Helmet>
        <title>Priority Tasks</title>
      </Helmet>
      <div className={classes.header}>
        <h2>
        Priority Tasks <FaTruckFast fill="#6F4E37" />
        </h2>
      </div>
      {priorityTasks.length > 0 ? (

      <div className={classes.tasksBox}>
        {loading
          ? "loading..."
          :priorityTasks.map((task) => (
              <div className={classes.task} key={task._id} >
                <h3 className={classes.taskHeader} onClick={()=>navigateToTask(task._id)}>
                  <FaTruckFast fill="#6F4E37" size="20px" />
                  {task.title }
                </h3>
                <label>
                  <input
                    type="checkbox"
                    checked={task.priority}
                    onChange={() => handleDeselect(task._id)}
                  />
                  Mark as priority
                </label>
                <DeleteAndBackButtons taskId={task._id} />
              </div>
            ))}
      </div>
      ):(
        <h3>No priority tasks found!</h3>
      )}
    </div>
  );
};

export default PriorityPage;
