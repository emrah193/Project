import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Wrapper from "../assets/wrappers/JobsContainer";
import {getAllJobs} from "../features/allJobs/allJobsSlice";
import Job from "./Job";
import Loading from "./Loading";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  const dispatch = useDispatch();
  const {
    jobs,
    isLoading,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store) => store.allJobs);
  useEffect(() => {
    dispatch(getAllJobs());
  }, [page, search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading />;
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>Jobs not found...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      {numOfPages > 1 && <PageBtnContainer />}
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
