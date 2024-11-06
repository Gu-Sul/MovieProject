import { useState } from "react";
import movieListData from "./data/movieListData.json";
import movieDetailData from "./data/movieDetailData.json";
import "./App.scss";
import Main from "./page/Main";
import { Route, Routes } from "react-router-dom";
import { Detail } from "./page/Detail";

function App() {
  const [movies] = useState(movieListData.results);
  const [movieDetail] = useState(movieDetailData);
  return (
    <div>
      <h1 className="text-[60px] bg-black text-[white] pl-[50px]">
        Movie List
      </h1>
      <main className="flex flex-wrap gap-[20px] justify-center">
        <Routes>
          <Route path="/" element={<Main movie={movies} />} />
          <Route path="/detail" element={<Detail movie={movieDetail} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
