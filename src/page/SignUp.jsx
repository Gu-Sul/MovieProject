import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useForm } from "react-hook-form";

export const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm();

  const password = watch("password");

  const handleSignUp = async (data) => {
    const { email, password, name } = data;

    const { data: signUpData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      alert("회원가입에 실패하였습니다.");
    } else {
      alert("회원가입 성공!");
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col min-h-screen w-full border rounded-[5px]">
      <div className="border px-[70px] py-[120px] w-[700px] h-[70vh]">
        <h1 className="text-[30px] font-[900] py-[20px]">SignUp</h1>
        <form
          className="flex flex-col justify-center items-center gap-[30px] w-full"
          onSubmit={handleSubmit(handleSignUp)}
        >
          <input
            type="text"
            className="border rounded-[5px] w-full p-[10px]"
            placeholder="이름"
            {...register("name", { required: "이름을 입력해주세요" })}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input
            type="email"
            className="border rounded-[5px] w-full p-[10px]"
            placeholder="이메일"
            {...register("email", {
              required: "이메일 주소를 입력해주세요",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "유효한 이메일 주소를 입력해주세요",
              },
            })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            type="password"
            className="border rounded-[5px] w-full p-[10px]"
            placeholder="비밀번호"
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자 이상이어야 합니다",
              },
            })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <input
            type="password"
            className="border rounded-[5px] w-full p-[10px]"
            placeholder="비밀번호 확인"
            {...register("password2", {
              required: "비밀번호 확인을 입력해주세요",
              validate: (value) =>
                value === password || "비밀번호가 일치하지 않습니다",
            })}
            aria-invalid={errors.password2 ? "true" : "false"}
          />
          {errors.password2 && (
            <p className="text-red-500">{errors.password2.message}</p>
          )}

          <button
            className="bg-[aqua] border rounded-[5px] p-[15px] w-full"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "가입 중..." : "SignUp"}
          </button>
        </form>
      </div>
    </div>
  );
};
