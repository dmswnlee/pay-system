import { useSelector } from "react-redux";

const MyInfo = () => {
  const currentUser = useSelector(
    (state: { currentUser: string | null }) => state.currentUser,
  );

  return (
    <div>
      <h1>내 인사정보</h1>
      {currentUser && <p>현재 로그인된 유저의 아이디: {currentUser}</p>}
    </div>
  );
};

export default MyInfo;
