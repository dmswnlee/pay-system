import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { firestoreService } from "../firebase";
import { Table, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import styled from "styled-components";

// 유저인포 인터페이스를 정의
interface UserInfo {
  id: string;
  dateOfJoin: string;
  email: string;
  memNo: string;
  name: string;
  position: string;
  team: string;
  uid: string;
}
// 유저인포 인터페이스를 정의

// 스타일드 컴포넌트를 이용한 스타일 정의
const StyledHeading = styled.h1`
  color: #171923;
  font-size: 32px;
  line-height: 150%;
  margin: 56px 0 64px;
`;

const Contents = styled.div`
  display: flex;
  gap: 72px;
`;

const UserImg = styled.div`
  width: 272px;
  height: 272px;
  border-radius: 100%;
  background-color: #d9d9d9;
`;
// 스타일드 컴포넌트를 이용한 스타일 정의

const MyInfo = () => {
  const currentUser = useSelector(
    (state: { currentUser: string | null }) => state.currentUser,
  );

  const storedUserInfo = localStorage.getItem("userInfo");
  const loadUserInfoFromLocalStorage = () =>
    JSON.parse(storedUserInfo || "[]") as UserInfo[];

  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);

  // 파이어베이스의 users 데이터중에서 현재 id값에 해당하는 정보 조회 함수
  const fetcher = async () => {
    const q = query(
      collection(firestoreService, "users"),
      where("uid", "==", currentUser),
    );

    try {
      const querySnapshot = await getDocs(q);
      const firestoreUserInfo = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as UserInfo,
      );

      setUserInfo(firestoreUserInfo);
      localStorage.setItem("userInfo", JSON.stringify(firestoreUserInfo));
    } catch (error) {
      console.error("Error", error);
    }
  };
  // 파이어베이스의 users 데이터중에서 현재 id값에 해당하는 정보 조회 함수

  // 컴포넌트가 마운트될 때 실행, 로컬스토리지에 정보가 있으면 로드, 그렇지 않으면 fetcher실행
  useEffect(() => {
    if (storedUserInfo) {
      setUserInfo(loadUserInfoFromLocalStorage());
    } else {
      fetcher();
    }
  }, [currentUser]);
  // 컴포넌트가 마운트될 때 실행, 로컬스토리지에 정보가 있으면 로드, 그렇지 않으면 fetcher실행

  return (
    <div>
      <StyledHeading>내 인사정보</StyledHeading>
      <Contents>
        <UserImg></UserImg>
        <TableContainer
          borderRadius="12px"
          border="1px solid"
          borderColor="gray.100"
          flex="1"
        >
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Th>이름</Th>
                <Td>{userInfo.map((info) => info.name)}</Td>
              </Tr>
              <Tr>
                <Th>직위</Th>
                <Td>{userInfo.map((info) => info.position)}</Td>
              </Tr>
              <Tr>
                <Th>입사일</Th>
                <Td>{userInfo.map((info) => info.dateOfJoin)}</Td>
              </Tr>
              <Tr>
                <Th>부서</Th>
                <Td>{userInfo.map((info) => info.team)}</Td>
              </Tr>
              <Tr>
                <Th>이메일</Th>
                <Td>{userInfo.map((info) => info.email)}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Contents>
    </div>
  );
};

export default MyInfo;
