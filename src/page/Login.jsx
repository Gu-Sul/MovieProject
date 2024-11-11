import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../authSlice";
import { supabase } from "../../supabaseClient";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(email, password));
      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      setError("아이디와 비밀번호를 확인해주세요.");
    }
  };

  const KakaoLoginButton = () => {
    const handleKakaoLogin = async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: `https://yvldwxcoexryhcxkclcj.supabase.co/auth/v1/callback`,
        },
      });
      if (error) console.error("카카오 로그인 에러:", error.message);
    };

    return <button onClick={handleKakaoLogin}>카카오로 로그인</button>;
  };
  return (
    <>
      <div className=" flex items-center justify-center  h-screen w-full border  rounded-[5px]">
        <div className="border px-[70px] py-[120px] w-[600px] h-[60vh]">
          <KakaoLoginButton />
          <h1 className="  text-[30px] font-[900] py-[20px]">Login</h1>
          <form
            className=" flex flex-col justify-center items-center gap-[30px] w-full "
            onSubmit={handleLogin}
          >
            <input
              type="email"
              className="border rounded-[5px] w-full p-[10px] "
              placeholder="아이디"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="border rounded-[5px] w-full p-[10px]"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {status === "failed" && <p className="text-red-500">{error}</p>}
            <button
              className="bg-[aqua] border rounded-[5px] p-[15px] w-full"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "로그인 중..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
