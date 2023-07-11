import React from "react";
import classnames from "classnames";
import { usePagination } from "./UsePagination";
import { DOTS } from "./UsePagination";
import "./style.scss";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames("pagination-container w-full flex-wrap ", {
        [className]: className,
      })}
    >
      <li
        className={classnames("pagination-select", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div>PREV</div>
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li className="pagination-item dots" key={index}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
            key={index}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames("pagination-select", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div>NEXT</div>
      </li>
    </ul>
  );
};

export default Pagination;
