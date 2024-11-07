import { useEffect, useState } from "react";
import "./App.scss";
import Main from "./page/Main";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Detail } from "./page/Detail";
import axios from "axios";
import { NavBar } from "./components/NavBar";
import { SignUp } from "./page/SignUp";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailData, setDetailData] = useState([]);

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
            },
          }
        );
        setMovies(movieListResponse.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const details = await Promise.all(
          movies.map(async (movie) => {
            const detailResponse = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}`,
              {
                params: {
                  api_key: import.meta.env.VITE_TMDB_API_KEY,
                  language: "ko-KR",
                },
              }
            );
            return detailResponse.data;
          })
        );
        setDetailData(details);
      } catch (error) {
        console.error("error fetching movie details", error);
      }
    };

    fetchMovieDetails();
  }, [movies]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to="/">
        <h1 className="text-[60px] bg-black text-[white] pl-[50px] cursor-pointer">
          Movie List
        </h1>
      </Link>
      <NavBar />
      <main className="flex flex-wrap gap-[20px] justify-center">
        <Routes>
          <Route path="/" element={<Main movies={movies} />} />
          <Route
            path="/detail/:movieId"
            element={<Detail movies={detailData} />}
          />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
