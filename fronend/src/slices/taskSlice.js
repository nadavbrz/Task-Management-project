import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../config";

const initialState = {
  tasks: [],
  task: {},
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "task/fetch",
  async (_, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      };
      const { data } = await axios.get(`${API_BASE_URL}/tasks`, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchTask = createAsyncThunk(
  "task/fetchById",
  async (id, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      };
      const { data } = await axios.get(`${API_BASE_URL}/tasks/${id}`, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createTask = createAsyncThunk(
  "task/create",
  async (taskData, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      };
      const { data } = await axios.post(
        `${API_BASE_URL}/tasks`,
        taskData,
        config
      );
      return data;
    } catch {
      return thunkAPI.rejectWithValue({ error: "Invalid request" });
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/update",
  async ({ id, taskData }, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      };
      const { data } = await axios.put(
        `${API_BASE_URL}/tasks/${id}`,
        taskData,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/delete",
  async (id, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      };
      await axios.delete(`${API_BASE_URL}/tasks/${id}`, config);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.tasks = payload;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(fetchTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTask.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.task = payload;
        state.error = null;
      })
      .addCase(fetchTask.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.tasks.push(payload);
        state.error = null;
      })
      .addCase(createTask.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        state.loading = false;
        const index = state.tasks.findIndex((task) => task._id === payload._id);
        if (index !== -1) {
          state.tasks[index] = payload;
        }
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== payload);
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default taskSlice.reducer;
