import React from "react";

function Pagination({ totalPosts, postPerPage, setCurrentPage }) {
  let pages = [];

  for (let i = 1; i < Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      <div>Pagination</div>
      {pages.map((page,i) => (
        <button key={i} onClick={() => setCurrentPage(page)}>
          {page}
        </button>
      ))}
    </>
  );
}

export default Pagination;
