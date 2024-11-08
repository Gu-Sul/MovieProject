import { useNavigate } from "react-router-dom";

const MovieCard = ({ movies }) => {
  const navigate = useNavigate();
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const posterUrl = movies.poster_path
    ? `${imageBaseUrl}${movies.poster_path}`
    : "error";
  const roundedRating = movies.vote_average.toFixed(1);
  const handler = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <section
      onClick={() => handler(movies.id)}
      className=" w-[300px] p-[10px] cursor-pointer "
    >
      <img
        className="h-[400px] rounded-[5px]"
        src={posterUrl}
        alt={`${movies.title}Poster`}
      />
      <h2>{movies.title}</h2>
      <p>평점: {roundedRating}</p>
    </section>
  );
};

export default MovieCard;
