export const MovieDetail = ({ movie }) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : "error";
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
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};
