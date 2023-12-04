import React from "react";
import Navbar from "./components/Navbar";
import { apiUrl,filterData } from "./data";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";

const App = () => {

  const [courses,setCourses]=useState(null);
  const [loading,setLoading]=useState(true);
  const [category,setCategory]=useState(filterData[0].title);

  async function fetchData(){
    setLoading(true);
    try{
      const response=await fetch(apiUrl);
      const output=await response.json();
      setCourses(output.data);
    }
    catch(err){
      toast.error("Something went wrong!");
    }
    setLoading(false);
  }

  useEffect(()=>{
    fetchData();
  },[]);

  return (
  <div className="min-h-screen bg-bgDark2">

    <div><Navbar/></div>

    <div >
      <Filter
          filterData={filterData}
          category={category}
          setCategory={setCategory}
        />

      <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
        {
          loading?(<Spinner/>):(<Cards  category={category} courses={courses}/>)
        }
      </div>
    </div>

    
      
  </div>
  );
};

export default App;
