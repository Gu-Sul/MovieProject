import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : "error";
  const roundedRating = movie.vote_average.toFixed(1);
  const handler = () => {
    navigate("/detail");
  };

  return (
    <section onClick={handler} className=" w-[200px] p-[10px] cursor-pointer ">
      <img
        className="h-[280px] rounded-[5px]"
        src={posterUrl}
        alt={`${movie.title}Poster`}
      />
      <h2>{movie.title}</h2>
      <p>평점: {roundedRating}</p>
    </section>
  );
};

export default MovieCard;
