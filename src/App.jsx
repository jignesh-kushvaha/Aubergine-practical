import { useState,useEffect } from "react";
import "./App.css";
import University from "./Component/University";

function App() {
  const [initialData, setInitialData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [val, setVal] = useState("");


  function handleSearch(){
    setFilterData(initialData.filter(item => item.country.toLowerCase().includes(val.toLowerCase())));
    console.log(filterData);
  }

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json')
      .then((response) => response.json())
      .then((data) => {
        setInitialData(data);
        setFilterData(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);


  return (
    <div className="container">
      <div className="p-3 m-2">
        <input type="text" placeholder="Countrywise search" val={val} onChange={(e)=>setVal(e.target.value)}/>
        <button onClick={handleSearch}>Search</button>
      </div>
      <University Data={filterData}/>
    </div>
  );
}

export default App;
