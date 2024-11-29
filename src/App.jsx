import { useState,useEffect } from "react";
import "./App.css";
import University from "./Component/University";
import Pagination from "./Component/Pagination";

function App() {
  const [initialData, setInitialData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [val, setVal] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(false);

  const indexOfLastPage = currentPage * postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;

  let currentPageDatas = filterData.slice(indexOfFirstPage, indexOfLastPage);

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
    }
  }

  useEffect(() => {
    setIsLoading(true);
    fetch('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        setIsLoading(false);
        setInitialData(data);
        setFilterData(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);


  return (
    <>
    {
      isLoading ? "loading..." : 
      <div className="container">
      <div className="p-3 m-2">
        <input type="text" placeholder="Countrywise search" val={val} onChange={handleSearch}/>
      </div>
      <University Data={currentPageDatas}/>
      <Pagination totalPosts={filterData.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage}/>
    </div>
    }
  </>
  );
}

export default App;
