import React, { useState } from "react";
import axios from "axios";

export default function SearchBar({ isError, isLoading, setData }) {
  const [inputVal, setInput] = useState("");

  function inputHandler(event) {
    setInput(event.target.value);
  }
  function clickHandler() {
    if (inputVal != "") {
      isLoading(true);
    }

    const options = {
      method: "GET",
      url: "https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe",
      params: {
        query: inputVal.trim(),
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
        if (result.data.length <= 0) {
          isLoading(false);
          isError(true);
          throw new Error("Error on fetching data");
        }
        // Set Data
        setData(result.data);
        setInput("");
        isError(false);
        isLoading(false);
      };
      response();
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      //setLoadingStatus(false)
      console.log("finally");
    }
  }
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
    </>
  );
}
