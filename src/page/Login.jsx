import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, loginWithKakao } from "../authSlice";
import { supabase } from "../../supabaseClient";
import { useForm } from "react-hook-form";

export const Login = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const handleLogin = async (data) => {
    const result = await dispatch(loginUser(data.email, data.password));

    if (result && result.success) {
      alert("로그인 성공!");
      navigate("/");
    } else {
      setError(result.message || "아이디와 비밀번호를 확인해주세요.");
      alert("아이디와 비밀번호를 확인해주세요.");
    }
  };

  const handleKakaoLogin = async (data) => {
    const result = await dispatch(loginWithKakao(data.email, data.password));

    if (result && result.success) {
    } else {
      setError(result.message || "카카오 로그인 오류");
      alert("카카오 로그인 오류");
    }
  };

  return (
    <>
      <div className=" flex items-center justify-center  h-screen w-full border  rounded-[5px]">
        <div className="border px-[70px] py-[120px] w-[600px] h-[60vh]">
          <button onClick={handleKakaoLogin}>카카오 로그인</button>
          <h1 className="  text-[30px] font-[900] py-[20px]">Login</h1>
          <form
            className=" flex flex-col justify-center items-center gap-[30px] w-full "
            onSubmit={handleSubmit(handleLogin)}
          >
            <input
              type="email"
              className="border rounded-[5px] w-full p-[10px] "
              placeholder="이메일"
              {...register("email", { required: "아이디를 입력해주세요" })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {console.log(errors.email)}

            <input
              type="password"
              className="border rounded-[5px] w-full p-[10px]"
              placeholder="비밀번호"
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
              })}
            />

            <button
              className="bg-[aqua] border rounded-[5px] p-[15px] w-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "로그인 중..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
