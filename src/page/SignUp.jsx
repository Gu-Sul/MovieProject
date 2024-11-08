export const SignUp = () => {
  return (
    <>
      <div className=" flex items-center justify-center flex-col min-h-screen w-full border  rounded-[5px]">
        <div className="border px-[70px] py-[120px] w-[700px] h-[70vh]">
          <h1 className="  text-[30px] font-[900] py-[20px]">SignUp</h1>
          <form className=" flex flex-col justify-center items-center gap-[30px] w-full ">
            <input
              type="text"
              className="border rounded-[5px] w-full p-[10px] "
              placeholder="이름"
            />

            <input
              type="email"
              className="border rounded-[5px] w-full p-[10px] "
              placeholder="이메일"
            />

            <input
              type="password"
              className="border rounded-[5px] w-full p-[10px]"
              placeholder="비밀번호"
            />
            <input
              type="password"
              className="border rounded-[5px] w-full p-[10px]"
              placeholder="비밀번호 확인"
            />

            <button className="bg-[aqua] border rounded-[5px] p-[15px]  w-full">
              SignUp
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
