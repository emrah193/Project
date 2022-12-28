import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";
import authHeader from "../../utils/authHeader";
import customFetch, {checkUnauthorizedResponse} from "../../utils/axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import {clearAllJobState} from "../allJobs/allJobsSlice";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/register", user);
      return resp.data;
    } catch (error) {
      return checkUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user);
      return resp.data;
    } catch (error) {
      return checkUnauthorizedResponse(error, thunkAPI);
    }
  }
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.patch(
        "/auth/updateUser",
        user,
        authHeader(thunkAPI)
      );
      return resp.data;
    } catch (error) {
      return checkUnauthorizedResponse(error, thunkAPI);
    }
  }
);
export const clearStore = createAsyncThunk(
  "user/clearStore",
  async (message, thunkAPI) => {
    try {
      thunkAPI.dispatch(logoutUser(message));
      thunkAPI.dispatch(clearAllJobState());
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, {payload}) => {
      const {user} = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hello, ${user.name}`);
    },
    [registerUser.rejected]: (state, {payload}) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, {payload}) => {
      const {user} = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hello, ${user.name}`);
    },
    [loginUser.rejected]: (state, {payload}) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, {payload}) => {
      const {user} = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`User updated!`);
    },
    [updateUser.rejected]: (state, {payload}) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [clearStore.rejected]: () => {
      toast.error("Clear store error...");
    },
  },
});
export const {logoutUser} = userSlice.actions;
export default userSlice.reducer;
