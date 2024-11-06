export const MovieDetail = ({ movie }) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : "error";
  const roundedRating = movie.vote_average.toFixed(1);
  const genre = movie.genres;
  const genreNames = genre.map((genre) => genre.name).join(", ");
  return (
    <div className="flex p-[20px] gap-[10px]">
      <img className="h-[400px]" src={posterUrl} alt={movie.id} />
      <div>
        <h1>{movie.title}</h1>
        <span>평점: {roundedRating}</span>
        <h2>{genreNames}</h2>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};
