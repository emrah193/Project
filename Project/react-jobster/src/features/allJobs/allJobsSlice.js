import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import authHeader from "../../utils/authHeader";
import customFetch, {checkUnauthorizedResponse} from "../../utils/axios";
const initialFilterState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFilterState,
};

export const getAllJobs = createAsyncThunk(
  "/allJobsSlice/getAllJobs",
  async (_, thunkAPI) => {
    const {page, search, searchStatus, searchType, sort} =
      thunkAPI.getState().allJobs;
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    try {
      const resp = await customFetch.get(url, authHeader(thunkAPI));
      return resp.data;
    } catch (error) {
      return checkUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const getStats = createAsyncThunk(
  "/allJobs/getStats",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("/jobs/stats", authHeader(thunkAPI));
      return resp.data;
    } catch (error) {
      return checkUnauthorizedResponse(error, thunkAPI);
    }
  }
);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, {payload: {name, value}}) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return {...state, ...initialState};
    },
    changePage: (state, {payload}) => {
      state.page = payload;
    },
    clearAllJobState: () => initialState,
  },
  extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (state, {payload}) => {
      state.isLoading = false;
      state.jobs = payload.jobs;
      state.numOfPages = payload.numOfPages;
      state.totalJobs = payload.totalJobs;
    },
    [getAllJobs.rejected]: (state, {payload}) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [getStats.pending]: (state) => {
      state.isLoading = true;
    },
    [getStats.fulfilled]: (state, {payload}) => {
      state.isLoading = false;
      state.stats = payload.defaultStats;
      state.monthlyApplications = payload.monthlyApplications;
    },
    [getStats.rejected]: (state, {payload}) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});
export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobState,
} = allJobsSlice.actions;
export default allJobsSlice.reducer;
