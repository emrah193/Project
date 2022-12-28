import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import sidebarSlice from "./features/sidebar/sidebarSlice";
import jobSlice from "./features/job/jobSlice";
import allJobsSlice from "./features/allJobs/allJobsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    sidebar: sidebarSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
  },
});
