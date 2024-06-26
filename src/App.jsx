import { useEffect, useState } from "react";
import reactLogo from "./components/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./components/Card";
import axios from "axios";

function App() {
  const [inputVal, setInput] = useState("");
  const [dataVal, setData] = useState([]);
  const [clickCounter, setCounter] = useState(0);
  const [isError, setErrorStatus] = useState(false);
  const [isLoading, setLoadingStatus] = useState(false);
  
  function inputHandler(event) {
    setInput(event.target.value);
  }
  function clickHandler() {
    setLoadingStatus(true);
    setCounter((prev) => prev + 1);
    //fetching data
    const options = {
      method: "GET",
      url: "https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe",
      params: {
        query: inputVal,
      },
      headers: {
        "X-RapidAPI-Key": "69399e9b3emsh7db593120c7dcbcp19967ajsn41f366d3790d",
        "X-RapidAPI-Host": "recipe-by-api-ninjas.p.rapidapi.com",
      },
    };

    try {
      const response = async () => {
        
        const result = await axios.request(options);
        // Handling the error status
        console.log("result.data : ", result.data);
        console.log("error", result.data.length <= 0);
        if (result.data.length <= 0) {
          setErrorStatus(true);
          throw new Error("Error on fetching data");
        }
        
        // Set Data
        setData(result.data);
        setInput("");
        setErrorStatus(false);
        
      };
      response();
    }
    catch (error) {
      console.error("Error: ", error);
    }
    finally{
      setLoadingStatus(false)
    } 
  }
  
  const isThereAnyData = dataVal && dataVal.length > 0;

  return (
    <>
      <div
        className="w-[80%] pb-4 mx-auto flex  justify-center gap-2 bg-cover rounded-md"
        style={{ backgroundImage: "url(./media/bg-foods.webp)" }}
      >
        <input
          onChange={inputHandler}
          className="w-96 h-12 mt-32 rounded-s-md pl-4 outline-none focus:outline-gray-700"
          type="search"
          value={inputVal}
          placeholder="food recpies"
        />
        <button
          onClick={clickHandler}
          className="mt-32 outline-none h-12 w-16 rounded-e-md text-xl font-semibold bg-gray-700 text-white transition-all hover:bg-gray-500"
        >
          click
        </button>
      </div>

      {isLoading ? (<div className="text-center">
          <div className="mt-4" role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>) : isError ? (
        <div className="w-[80%] mx-auto mt-4">
          <p className="text-center text-xl text-red-900 font-semibold">
            *please put correct value in input*
          </p>
        </div>
      ) : isThereAnyData ?  ( 
         dataVal.map((data) => {
           return <Card key={data.ingredients} {...data} />
         })) : ("")
        }
    </>
  );
}

export default App;
