import MovieCard from "../components/MovieCard";

const Main = ({ movies }) => {
  return (
    <>
      {movies.map((movies) => (
        <MovieCard key={movies.id} movies={movies} />
      ))}
    </>
  );
};

export default Main;
