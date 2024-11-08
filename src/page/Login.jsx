export const Login = () => {
  return (
    <>
      <div className=" w-[500px] h-[600px] border mt-[200px] rounded-[5px]">
        <h1 className=" ml-[50px] mt-10 text-[30px] font-[900]">Login</h1>
        <form className="flex flex-col justify-center items-center gap-[30px]  h-[45vh] ">
          <input
            type="email"
            className="border rounded-[5px] w-[80%] h-[50px] p-[10px]"
            placeholder="아이디"
          />

          <input
            type="password"
            className="border rounded-[5px] w-[80%] h-[50px] p-[10px]"
            placeholder="비밀번호"
          />

          <button className="bg-[aqua] border rounded-[5px] w-[80%] h-[50px] mt-[50px] ">
            Login
          </button>
        </form>
      </div>
    </>
  );
};
