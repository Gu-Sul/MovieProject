import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: "ko-KR",
            },
          }
        );
        setMovie(response.data);
        console.log(movie);
      } catch (error) {
        console.error("Error fetching movie detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>영화 정보를 찾을 수 없습니다.</div>;
  }
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const posterUrl = `${imageBaseUrl}${movie.poster_path}`;
  const roundedRating = movie.vote_average.toFixed(1);
  const genre = movie.genres;
  const genreNames = genre.map((genre) => genre.name).join(", ");

  return (
    <div className="flex p-[20px] gap-[60px] w-[65vw] items-center">
      <img className="h-[400px]" src={posterUrl} alt={movie.id} />
      <div>
        <div className="flex justify-between text-[30px] font-[900] mb-[20px]">
          {movie.title}
          <span className="text-[15px] font-[600] flex items-end justify-center ">
            평점: {roundedRating}
          </span>
        </div>
        <h2 className="text-[] font-[900]  mb-[10px]">{genreNames}</h2>
        <br />
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};
