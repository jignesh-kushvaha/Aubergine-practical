import {useState} from "react";

function Pagination({ totalPosts, postPerPage, setCurrentPage }) {
  
  const [currentPageGroup, setCurrentPageGroup] = useState(0);

  const totalPages = Math.ceil(totalPosts / postPerPage);
  const pagesPerGroup = totalPosts > 10 ? 10 : totalPosts
  const startPage = currentPageGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
  
  // let pages = [];

  // for (let i = 1; i < Math.ceil(totalPosts / postPerPage); i++) {
  //   pages.push(i);
  // }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const handleNext = () => {
    if (endPage < totalPages) {
      setCurrentPageGroup((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPageGroup > 0) {
      setCurrentPageGroup((prev) => prev - 1);
    }
  };
  
  const handleLast = () => {    
    setCurrentPageGroup(Math.floor((totalPages-1)/pagesPerGroup));
  };
  
  const handleFirst = () => {    
    setCurrentPageGroup(Math.floor(0));
  };

  return (
    <div className="w-full m-4 p-4 flex items-center justify-center space-x-2">
      {currentPageGroup > 0 && (
        <button onClick={handlePrev} className="px-4 py-2 bg-gray-200 hover:bg-green-300 rounded-md">Previous</button>
      )}
      {currentPageGroup > 0 && (
        <button onClick={handleFirst} className="px-4 py-2 bg-gray-200 hover:bg-green-300 rounded-md">...</button>
      )}

      {pages.map((page,i) => (
        <button className="px-4 py-2 bg-blue-500 hover:bg-green-600 rounded-md" key={i} onClick={() => setCurrentPage(page)}>
          {page}
        </button>
      ))}

      {
        endPage < totalPages && (
          <button className="px-4 py-2 bg-gray-200 hover:bg-green-300 rounded-md" onClick={handleLast}>...</button>
        )
      }
      
      {endPage < totalPages && (
        <button className="px-4 py-2 bg-gray-200 hover:bg-green-300 rounded-md" onClick={handleNext}>Next</button>
      )}
    </div>
  );
}

export default Pagination;
