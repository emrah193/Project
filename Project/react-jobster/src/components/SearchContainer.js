import React from "react";
import {FormRow, FormRowSelect} from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import {useDispatch, useSelector} from "react-redux";
import {handleChange, clearFilters} from "../features/allJobs/allJobsSlice";

const SearchContainer = () => {
  const dispatch = useDispatch();
  const {isLoading, search, searchStatus, searchType, sort, sortOptions} =
    useSelector((store) => store.allJobs);
  const {jobTypeOptions, statusOptions} = useSelector((store) => store.job);

  const handleFilters = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({name, value}));
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>Search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleFilters}
          />
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleFilters}
            list={["all", ...statusOptions]}
          />
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleFilters}
            list={["all", ...jobTypeOptions]}
          />
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleFilters}
            list={sortOptions}
          />
          <button
            type="button"
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={() => dispatch(clearFilters())}
          >
            reset filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
