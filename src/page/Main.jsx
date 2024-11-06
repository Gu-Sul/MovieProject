import MovieCard from "../components/MovieCard";

const Main = ({ movie }) => {
  return (
    <>
      {movie.map((movies) => (
        <MovieCard key={movies.id} movie={movies} />
      ))}
    </>
  );
};

export default Main;
