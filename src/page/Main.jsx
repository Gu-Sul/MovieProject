import MovieCard from "../components/MovieCard";

const Main = ({ movies }) => {
  return (
    <div className="flex flex-wrap gap-[20px] justify-center mt-[130px] px-[150px] cardHover">
      {movies.map((movies) => (
        <MovieCard key={movies.id} movies={movies} />
      ))}
    </div>
  );
};

export default Main;
