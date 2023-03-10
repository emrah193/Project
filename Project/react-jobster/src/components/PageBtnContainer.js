import React from "react";
import {HiChevronDoubleLeft, HiChevronDoubleRight} from "react-icons/hi";
import {useSelector, useDispatch} from "react-redux";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import {changePage} from "../features/allJobs/allJobsSlice";

const PageBtnContainer = () => {
  const dispatch = useDispatch();
  const {page, numOfPages} = useSelector((store) => store.allJobs);

  const pages = Array.from({length: numOfPages}, (_, index) => index + 1);
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      <button type="button" className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
      </button>
      <div className="btn-container">
        {pages.map((pageNum) => {
          return (
            <button
              type="button"
              key={pageNum}
              className={pageNum === page ? "pageBtn active" : "pageBtn"}
              onClick={() => dispatch(changePage(pageNum))}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
      <button type="button" className="next-btn" onClick={nextPage}>
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
