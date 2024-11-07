import { useParams } from "react-router-dom";

export const MovieDetail = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id.toString() === movieId);
  console.log(movie);
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
