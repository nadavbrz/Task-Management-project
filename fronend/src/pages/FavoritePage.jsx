import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { fetchTasks, updateTask } from "../slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import classes from "../style/pages/TaskStatus.module.css";
import DeleteAndBackButtons from "../components/DeleteAndBackButtons";

const FavoritePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [favoriteTasks, setFavoriteTasks] = useState([]);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (tasks) {
      setFavoriteTasks(tasks.filter((task) => task.favorite === true));
    }
  }, [tasks]);

  const handleDeselect = (taskId) => {
    const updatedTask = tasks.find((task) => task._id === taskId);
    if (updatedTask) {
      dispatch(updateTask({ id: taskId, taskData: { ...updatedTask, favorite: false } })).then(() => {
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
        <title>Favorite Tasks</title>
      </Helmet>
      <div className={classes.header}>
        <h2>
        Favorite Tasks <FaHeart fill="#DE5D83" />
        </h2>
      </div>
      {favoriteTasks.length > 0 ? (

      <div className={classes.tasksBox}>
        {loading
          ? "loading..."
          :favoriteTasks.map((task) => (
              <div className={classes.task} key={task._id} >
                <h3 className={classes.taskHeader} onClick={()=>navigateToTask(task._id)}>
                  <FaHeart fill="#DE5D83" size="20px" />
                  {task.title}
                </h3>
                <label>
                  <input
                    type="checkbox"
                    checked={task.favorite}
                    onChange={() => handleDeselect(task._id)}
                  />
                  Mark as favorite
                </label>
                <DeleteAndBackButtons taskId={task._id} />
              </div>
            ))}
      </div>
      ):(
        <h3 className={classes.notFound}>No favorite tasks found!</h3>
      )}
    </div>
  );
};

export default FavoritePage;
