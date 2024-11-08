import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const Search = () => {
  const { searchValue } = useParams(); // URL에서 검색어 파라미터 가져오기
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchValue) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: "ko-KR",
              query: searchValue,
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchValue]);

  return (
    <div className="p-[20px]">
      <h1>검색 결과: {searchValue}</h1>
      {loading && <p>검색 중...</p>}
      <div className="flex flex-wrap gap-[20px] justify-center mt-[130px] px-[150px]">
        {movies.length > 0
          ? movies.map((movie) => <MovieCard movies={movie} />)
          : !loading && <p>결과가 없습니다.</p>}
      </div>
    </div>
  );
};

export default Search;
