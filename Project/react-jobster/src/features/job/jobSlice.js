import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import authHeader from "../../utils/authHeader";
import customFetch, {checkUnauthorizedResponse} from "../../utils/axios";
import {getUserFromLocalStorage} from "../../utils/localStorage";
import {getAllJobs, hideLoading, showLoading} from "../allJobs/allJobsSlice";
import {logoutUser} from "../user/userSlice";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk(
  "/job/createJob",
  async (job, thunkAPI) => {
    try {
      const resp = await customFetch.post("/jobs", job, authHeader(thunkAPI));
      thunkAPI.dispatch(clearValues());
      return resp.data;
    } catch (error) {
      return checkUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "/job/deleteJob",
  async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
      const resp = await customFetch.delete(
        `/jobs/${jobId}`,
        authHeader(thunkAPI)
      );
      thunkAPI.dispatch(getAllJobs());
      return resp.data.msg;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      return checkUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const editJob = createAsyncThunk(
  "/job/editJob",
  async ({jobId, job}, thunkAPI) => {
    try {
      const resp = await customFetch.patch(
        `/jobs/${jobId}`,
        job,
        authHeader(thunkAPI)
      );
      thunkAPI.dispatch(clearValues());

      return resp.data;
    } catch (error) {
      return checkUnauthorizedResponse(error, thunkAPI);
    }
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, {payload: {name, value}}) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
    setEditJob: (state, {payload}) => {
      return {...initialState, isEditing: true, ...payload};
    },
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Job created!");
    },
    [createJob.rejected]: (state, {payload}) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [deleteJob.fulfilled]: (state, {payload}) => {
      toast.success(payload);
    },
    [deleteJob.rejected]: (state, {payload}) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [editJob.pending]: (state) => {
      state.isLoading = true;
    },
    [editJob.fulfilled]: (state, {payload}) => {
      state.isLoading = false;
      toast.success("Job Edited...");
    },
    [editJob.rejected]: (state, {payload}) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const {handleChange, clearValues, setEditJob} = jobSlice.actions;
export default jobSlice.reducer;
