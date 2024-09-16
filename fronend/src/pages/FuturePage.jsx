import React, { useEffect, useState } from "react";
import { FaStopwatch } from "react-icons/fa6";
import { fetchTasks, updateTask } from "../slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import classes from "../style/pages/TaskStatus.module.css";
import DeleteAndBackButtons from "../components/DeleteAndBackButtons";

const FuturePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [futureTasks, setFutureTasks] = useState([]);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (tasks) {
      setFutureTasks(tasks.filter((task) => task.future === true));
    }
  }, [tasks]);

  const handleDeselect = (taskId) => {
    const updatedTask = tasks.find((task) => task._id === taskId);
    if (updatedTask) {
      dispatch(updateTask({ id: taskId, taskData: { ...updatedTask, future: false } })).then(() => {
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
        <title>Future Tasks</title>
      </Helmet>
      <div className={classes.header}>
        <h2>
          Future Tasks <FaStopwatch fill="#004953"/>
        </h2>
      </div>
      {futureTasks.length > 0 ?(

      <div className={classes.tasksBox}>
        {loading
          ? "loading..."
          : futureTasks.map((task) => (
              <div className={classes.task} key={task._id}>
                <h3 className={classes.taskHeader}  onClick={()=>navigateToTask(task._id)}>
                  <FaStopwatch  fill="#004953" size="25px"  />
                  {task.title}
                </h3>
                <label>
                  <input
                    type="checkbox"
                    checked={task.future}
                    onChange={() => handleDeselect(task._id)}
                  />
                  Mark as future
                </label>
                <DeleteAndBackButtons taskId={task._id} />
              </div>
            ))}
      </div>
      ):(
        <h3>No future tasks found!</h3>
      )}
    </div>
  );
};

export default FuturePage;
