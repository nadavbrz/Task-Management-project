import React, { useEffect, useState } from "react";
import { FaListCheck } from "react-icons/fa6";
import { fetchTasks, updateTask } from "../slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import classes from "../style/pages/TaskStatus.module.css";
import DeleteAndBackButtons from "../components/DeleteAndBackButtons";

const CompletedPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [completedTasks, setCompletedTasks] = useState([]);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (tasks) {
      setCompletedTasks(tasks.filter((task) => task.completed === true));
    }
  }, [tasks]);

  const handleDeselect = (taskId) => {
    const updatedTask = tasks.find((task) => task._id === taskId);
    if (updatedTask) {
      dispatch(
        updateTask({
          id: taskId,
          taskData: { ...updatedTask, completed: false },
        })
      ).then(() => {
        dispatch(fetchTasks());
      });
    }
  };

  const navigateToTask = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  return (
    <div className={classes.pageContainer}>
      <Helmet>
        <title>Completed Tasks</title>
      </Helmet>
      <div className={classes.header}>
        <h2>
          Completed Tasks <FaListCheck fill="green" />
        </h2>
      </div>
      {completedTasks.length > 0 ? (
        <div className={classes.tasksBox}>
          {loading
            ? "loading..."
            : completedTasks.map((task) => (
                <div className={classes.task} key={task._id}>
                  <h3
                    className={classes.taskHeader}
                    onClick={() => navigateToTask(task._id)}
                  >
                    <FaListCheck fill="green" size="20px" />
                    {task.title}
                  </h3>
                  <label>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleDeselect(task._id)}
                    />
                    Mark as completed
                  </label>
                  <DeleteAndBackButtons taskId={task._id} />
                </div>
              ))}
        </div>
      ) : (
       <h3 className={classes.notFound}>No completed task found!</h3> 
      )}
    </div>
  );
};

export default CompletedPage;
