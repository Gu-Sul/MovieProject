import { useEffect, useState } from "react";
import "./App.scss";
import Main from "./page/Main";
import { Link, Route, Routes } from "react-router-dom";
import { Detail } from "./page/Detail";
import axios from "axios";
import { NavBar } from "./components/NavBar";
import { SignUp } from "./page/SignUp";
import { Login } from "./page/Login";
import Search from "./page/Serch";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const movieListResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/popular`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: "ko-KR",
              page: page,
            },
          }
        );
        setMovies((prevMovies) => [
          ...prevMovies,
          ...movieListResponse.data.results,
        ]);
        if (page >= movieListResponse.data.total_pages) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100 &&
      !loading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div>
      <div className="header">
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<Main movies={movies} />} />
        <Route path="/detail/:movieId" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search/:searchValue" element={<Search />} />
      </Routes>
      {loading && <div className="flex-none">데이터를 불러오는 중...</div>}
    </div>
  );
}

export default App;
