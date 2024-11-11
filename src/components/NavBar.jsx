import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useDebounce from "./useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../authSlice";

export const NavBar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);
  const navigate = useNavigate();
  const location = useLocation();
  const [image, setImage] = useState("/public/7915522.png");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

  const openProfile = () => {
    isProfileOpen ? setIsProfileOpen(false) : setIsProfileOpen(true);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const Modal = () => {
    return (
      <div className="fixed top-14 right-[90px] rounded-[10px] bg-[gray]">
        <div className=" cursor-pointer p-[12px] border-b-[1px]  text-center">
          {user.user_metadata.name}
        </div>

        <div
          onClick={handleLogout}
          className=" p-[12px] text-center cursor-pointer"
        >
          로그아웃
        </div>
      </div>
    );
  };

  return (
    <nav className="flex  bg-black text-[white] p-[10px] px-[30px] fixed top-[0]  w-[100%] z-[1000] ">
      <Link to="/">
        <div className=" pl-[120px] font-[900] text-[50px]">Movie List</div>
      </Link>

      <div className="ml-auto pr-[80px] flex items-center  gap-[15px]">
        <div className="searchInput">
          <input
            onChange={handleChange}
            type="text"
            className="text-[black] ml-[20px] pl-[15px] "
          />
          <button onClick={() => navigate(`/search/${inputValue}`)}>🔍</button>
        </div>
        {user ? (
          <div
            onClick={() => {
              openProfile();
            }}
          >
            {isProfileOpen ? <Modal /> : null}
            <img className=" w-[50px] h-[50px] " src={image} />
          </div>
        ) : (
          <>
            <Link to="login">
              <span className="  cursor-pointer ">로그인</span>
            </Link>
            <Link to="sign-up">
              <span className=" cursor-pointer ">회원가입</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
