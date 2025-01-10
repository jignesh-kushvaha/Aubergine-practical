// import { useState,useEffect } from "react";
// import "./App.css";
// import University from "./Component/University";
// import Pagination from "./Component/Pagination";

// function App() {
//   const [initialData, setInitialData] = useState([]);
//   const [filterData, setFilterData] = useState([]);
//   const [val, setVal] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const [postPerPage, setPostPerPage] = useState(20);
//   const [isLoading, setIsLoading] = useState(false);

//   const indexOfLastPage = currentPage * postPerPage;
//   const indexOfFirstPage = indexOfLastPage - postPerPage;

//   let currentPageDatas = filterData.slice(indexOfFirstPage, indexOfLastPage);

//   function handleSearch(e){
//     const searchValue = e.target.value;
//     setVal(searchValue);
  
//     if (searchValue.trim() === "") {
//       setFilterData(initialData);
//     } else {
//       const filtered = initialData.filter((item) =>
//         item.country.toLowerCase().includes(searchValue.toLowerCase())
//       );
//       setFilterData(filtered);
//     }
//   }

//   useEffect(() => {
//     setIsLoading(true);
//     fetch('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json')
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
        
//         setIsLoading(false);
//         setInitialData(data);
//         setFilterData(data);
//       })
//       .catch((error) => console.error("Error:", error));
//   }, []);


//   return (
//     <>
//     {
//       isLoading ? "loading..." : 
//       <div className="container">
//       <div className="p-3 m-2">
//         <input type="text" placeholder="Countrywise search" val={val} onChange={handleSearch}/>
//       </div>
//       <University Data={currentPageDatas}/>
//       <Pagination totalPosts={filterData.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage}/>
//     </div>
//     }
//   </>
//   );
// }

// export default App;

// window.innerHeight, document.documentElement.scrollTop, document.documentElement.scrollHeight
import { useState, useEffect } from "react";
import "./App.css";
import University from "./Component/University";

function App() {
  const [initialData, setInitialData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [val, setVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visibleData, setVisibleData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const ITEMS_TO_SHOW = 20;


  function handleSearch(e){
    const searchValue = e.target.value;
    setVal(searchValue);
  
    if (searchValue.trim() === "") {
      setFilterData(initialData);
    } else {
      const filtered = initialData.filter((item) =>
        item.country.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilterData(filtered);
      setVisibleData(filtered.slice(0, ITEMS_TO_SHOW));
      setHasMore(filterData.length > ITEMS_TO_SHOW);
    }
  }

  function getData(){
    fetch('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json')
      .then((response) => response.json())
      .then((data) => {
        setInitialData(data);
        setFilterData(data);
        setVisibleData(data.slice(0, ITEMS_TO_SHOW));
        setHasMore(data.length > ITEMS_TO_SHOW);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error:", error));
  }
  

  function loadMoreData() { 
    // console.log(window.innerHeight + document.documentElement.scrollTop , document.documentElement.scrollHeight);  
    if(!hasMore) return;
    
    const newDataToDisplay = filterData.slice(visibleData.length, visibleData.length + ITEMS_TO_SHOW);
    setVisibleData((prev)=> [...prev, ...newDataToDisplay]);   
    setHasMore(filterData.length > visibleData.length + ITEMS_TO_SHOW + newDataToDisplay.length);
  }

  function handleScrollToTop(){
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 300){
        setShowScrollButton(true);
      }else{
        setShowScrollButton(false);
      }

      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 100) {
        loadMoreData();
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleData, filterData]);
  
  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);


  return (
    <>
        <div className="container">
          <div className="p-3 m-2">
            <input
              type="text"
              placeholder="Countrywise search"
              value={val}
              onChange={handleSearch}
            />
          </div>
          <University Data={visibleData} />
          {isLoading && "...loading..."}
          {/* {!hasMore && <div className="text-center">No more data</div>} */}

          {showScrollButton && <button onClick={handleScrollToTop} className="topscrollbtn">↑</button>}
        </div>
    </>
  );
}

export default App;
