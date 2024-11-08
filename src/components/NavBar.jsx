import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useDebounce from "./useDebounce";

export const NavBar = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (debouncedValue.trim()) {
      navigate(`/search/${inputValue}`);
    }
  }, [debouncedValue, navigate]);

  useEffect(() => {
    setInputValue("");
  }, [location.pathname]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <nav className="flex  bg-black text-[white] p-[10px] fixed top-[80px] w-[100%] z-[999]">
      <Link to="/">
        <span className="m-[10px] ml-[40px] cursor-pointer  ">홈</span>
      </Link>
      <Link to="login">
        <span className="m-[10px]  cursor-pointer ">로그인</span>
      </Link>
      <Link to="sign-up">
        <span className="m-[10px] cursor-pointer ">회원가입</span>
      </Link>
      <div className="flex ml-[auto]">
        <input onChange={handleChange} type="text" className="text-[black]" />
        <button onClick={() => navigate(`/search/${inputValue}`)}>🔍</button>
      </div>
    </nav>
  );
};
