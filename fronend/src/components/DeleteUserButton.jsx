import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchAllUsers } from '../slices/authSlice';
import classes from '../style/components/DeleteUserButton.module.css';
import { API_BASE_URL } from "../config";
const DeleteUserButton = ({ userId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"))
    const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log("Deleting user with ID:", userId);
      try {
        await axios.delete(`${API_BASE_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`, 
          },
        });
        dispatch(fetchAllUsers());
      } catch (error) {
        console.error('Error deleting user:', error.response?.data?.message || error.message);
        alert('Failed to delete user');
      }
    }
  };

  return (
    <button className={classes.deleteButton} onClick={handleDelete}>
    Delete User
  </button>
  );
};

export default DeleteUserButton;
