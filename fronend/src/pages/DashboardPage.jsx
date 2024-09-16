import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { createTask, fetchTasks } from "../slices/taskSlice";
import { useNavigate } from "react-router-dom";
import classes from "../style/pages/DashboardPage.module.css";
import TaskItem from "../components/TaskItem";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks = [], loading, error } = useSelector((state) => state.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const toggleCreateTask = () => {
    setIsCreatingTask((prev) => !prev);
  };

  const handleTitleChange = (e) => {
    setNewTaskTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewTaskDescription(e.target.value);
  };

  const handleCreateTask = () => {
    if (newTaskTitle.trim() && newTaskDescription.trim()) {
      dispatch(createTask({ title: newTaskTitle, description: newTaskDescription }));
      setNewTaskTitle("");
      setNewTaskDescription("");
      setIsCreatingTask(false);
    } else {
      alert("Please fill in both title and description.");
    }
  };

  const shouldShowNoTasksMessage = !loading && !isCreatingTask && tasks.length === 0;
  const errorMessage = error ? (typeof error === 'object' ? JSON.stringify(error) : error) : null;

  return (
    <div className={classes.container}>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1>Dashboard</h1>
      <button onClick={toggleCreateTask} className={classes.createTaskBtn}>
        {isCreatingTask ? "Cancel" : "Create Task"}
      </button>
      {isCreatingTask && (
        <div className={classes.createTaskForm}>
          <input
            className={classes.titleInput}
            type="text"
            placeholder="Your task's title..."
            value={newTaskTitle}
            onChange={handleTitleChange}
          />
          <textarea
            placeholder="Your task's description..."
            value={newTaskDescription}
            onChange={handleDescriptionChange}
            className={classes.textarea}
          />
          <button className={classes.addTaskBtn} onClick={handleCreateTask}>
            Add task
          </button>
        </div>
      )}
      {errorMessage && <p className={classes.error}>Error: {errorMessage}</p>}
      <ul className={classes.taskList}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))
        ) : shouldShowNoTasksMessage ? (
          <p>No tasks found, click here to create task</p>
        ) : null}
      </ul>
    </div>
  );
};

export default DashboardPage;
