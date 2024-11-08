export const Login = () => {
  return (
    <>
      <div className=" flex items-center justify-center flex-col min-h-screen w-full border  rounded-[5px]">
        <div className="border px-[70px] py-[120px] w-[600px] h-[60vh]">
          <h1 className="  text-[30px] font-[900] py-[20px]">Login</h1>
          <form className=" flex flex-col justify-center items-center gap-[30px] w-full ">
            <input
              type="email"
              className="border rounded-[5px] w-full p-[10px] "
              placeholder="아이디"
            />

            <input
              type="password"
              className="border rounded-[5px] w-full p-[10px]"
              placeholder="비밀번호"
            />

            <button className="bg-[aqua] border rounded-[5px] p-[15px] pt-[20px]  w-full">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
