import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
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
    <>
      <div className=" flex items-center justify-center flex-col min-h-screen w-full border  rounded-[5px]">
        <div className="border px-[70px] py-[120px] w-[700px] h-[70vh]">
          <h1 className="  text-[30px] font-[900] py-[20px]">SignUp</h1>
          <form
            className=" flex flex-col justify-center items-center gap-[30px] w-full "
            onSubmit={handleSignUp}
          >
            <input
              type="text"
              className="border rounded-[5px] w-full p-[10px] "
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              className="border rounded-[5px] w-full p-[10px] "
              placeholder="이메일"
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
            <input
              type="password"
              className="border rounded-[5px] w-full p-[10px]"
              placeholder="비밀번호 확인"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />

            <button
              className="bg-[aqua] border rounded-[5px] p-[15px]  w-full"
              type="submit"
              onClick={() => {
                if (password !== password2) {
                  alert("비밀번호가 다릅니다.");
                } else {
                  return;
                }
              }}
            >
              SignUp
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
