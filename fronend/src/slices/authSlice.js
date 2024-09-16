import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../config";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
    users :[],
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/register`,
        userData
      );
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "/";
      return data;
    } catch (error) {
      if (error.response && error.response.data.errors) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ message: error.message });
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/login`, userData);
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "/";
      return data;
    } catch (error) {
      if (error.response && error.response.data.errors) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  }
);

export const getUser = createAsyncThunk(
  "users/getProfile",
  async (_, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      };

      const { data } = await axios.get(`${API_BASE_URL}/users/profile`, config);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      };

      const { data } = await axios.get(`${API_BASE_URL}/users/all`, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
  return null;
});

export const updateUser = createAsyncThunk(
  "users/updateProfile",
  async (formData, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put(
        `${API_BASE_URL}/users/profile`,
        formData,
        config
      );
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      };
      const { data } = await axios.delete(
        `${API_BASE_URL}/users/${id}`,
        config
      );
      return data;
    } catch (error) {}
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload; 
        state.error = null;
      })
      .addCase(fetchAllUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default authSlice.reducer;
