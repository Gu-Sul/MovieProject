const Modal = () => {
  return (
    <div className="modal-overlay">
      <div className=" cursor-pointer ">{user.user_metadata.name}</div>
      <div onClick={handleLogout} className=" cursor-pointer">
        로그아웃
      </div>
    </div>
  );
};
