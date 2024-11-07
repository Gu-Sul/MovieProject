import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className=" flex gap-[20px]  bg-black text-[white] p-[10px]">
      <Link to="/">
        <span className="m-[10px] ml-[40px] cursor-pointer  ">홈</span>
      </Link>
      <Link to="login">
        <span className="m-[10px]  cursor-pointer ">로그인</span>
      </Link>
      <Link to="sign-up">
        <span className="m-[10px] cursor-pointer ">회원가입</span>
      </Link>
    </nav>
  );
};
