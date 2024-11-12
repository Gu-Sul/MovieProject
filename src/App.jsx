import { useEffect, useState } from "react";
import "./App.scss";
import Main from "./page/Main";
import { Link, Route, Routes } from "react-router-dom";
import { Detail } from "./page/Detail";
import axios from "axios";
import { NavBar } from "./components/NavBar";
import { SignUp } from "./page/SignUp";
import { Login } from "./page/Login";
import Search from "./page/Serch";
import MovieCard from "./components/MovieCard";
import { useDispatch } from "react-redux";
import { supabase } from "../supabaseClient";
import { setUser, clearUser } from "./authSlice";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // 로그인 유지 상태를 확인하고 설정하는 함수
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        // 세션이 있으면 유저 정보를 Redux에 저장
        dispatch(setUser(data.session.user));
      }
    };

    // 초기 세션 확인
    checkSession();

    // 인증 상태 변화 감지 및 처리
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // 로그인 또는 세션 갱신 이벤트 발생 시 Redux 상태에 저장
          dispatch(setUser(session.user));
        } else {
          // 로그아웃 시 Redux 상태 초기화
          dispatch(clearUser());
        }
      }
    );

    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const movieListResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/popular`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: "ko-KR",
              page: page,
            },
          }
        );
        setMovies((prevMovies) => [
          ...prevMovies,
          ...movieListResponse.data.results,
        ]);
        if (page >= movieListResponse.data.total_pages) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100 &&
      !loading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, MovieCard]);

  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<Main movies={movies} />} />
        <Route path="/detail/:movieId" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search/:searchValue" element={<Search />} />
      </Routes>
      {loading && <div className="flex-none">데이터를 불러오는 중...</div>}
    </div>
  );
}

export default App;
