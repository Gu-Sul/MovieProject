export const SignUp = () => {
  return (
    <>
      <div className=" w-[500px] border mt-[60px] rounded-[5px]">
        <h1 className=" ml-[50px] mt-10 text-[30px] font-[900]">Sign Up</h1>
        <form className="flex flex-col justify-center items-center gap-[30px]  h-[60vh] ">
          <input
            type="text"
            className="border rounded-[5px] w-[80%] h-[50px] p-[10px]"
            placeholder="이름"
          />
          <input
            type="email"
            className="border rounded-[5px] w-[80%] h-[50px] p-[10px]"
            placeholder="이메일"
          />
          <input
            type="password"
            className="border rounded-[5px] w-[80%] h-[50px] p-[10px]"
            placeholder="비밀번호"
          />
          <input
            type="password"
            className="border rounded-[5px] w-[80%] h-[50px] p-[10px]"
            placeholder="비밀번호 확인"
          />
          <button className="bg-[aqua] border rounded-[5px] w-[80%] h-[50px] mt-[40px]">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};
