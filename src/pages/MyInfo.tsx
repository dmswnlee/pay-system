import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { firestoreService, firestorageService } from "../firebase";
import {
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
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
  profileImageUrl: string;
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

const UserImgBox = styled.div`
  width: 208px;
  height: 208px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  border-radius: 100%;
  overflow: hidden;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;
// 스타일드 컴포넌트를 이용한 스타일 정의

const MyInfo = () => {
  const currentUser = sessionStorage.getItem("uid");
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);

  // 프로필 이미지를 업로드하고 Firestore에 프로필 이미지 URL을 저장하는 함수
  const handleProfileImageUpload = async (file: File) => {
    const storageRef = ref(firestorageService, `profile_images/${currentUser}`);
    const snapshot = await uploadBytes(storageRef, file);
    const profileImageUrl = await getDownloadURL(snapshot.ref);

    await updateDoc(doc(firestoreService, `users/${userInfo[0].id}`), {
      profileImageUrl,
    });
    // Firestore에 프로필 이미지 URL을 저장

    setUserInfo((prevUserInfo) => {
      const updatedUserInfo = prevUserInfo.map((user) => ({
        ...user,
        profileImageUrl: profileImageUrl,
      }));
      return updatedUserInfo;
    });
  };

  // 파이어베이스의 users 데이터 중에서 현재 id값에 해당하는 정보 조회 함수
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
    } catch (error) {
      console.error("Error", error);
    }
  };
  // 파이어베이스의 users 데이터 중에서 현재 id값에 해당하는 정보 조회 함수

  // 컴포넌트가 마운트될 때 실행, 로컬스토리지에 정보가 있으면 로드, 그렇지 않으면 fetcher 실행
  useEffect(() => {
    fetcher();
  }, [currentUser]);
  // 컴포넌트가 마운트될 때 실행, 로컬스토리지에 정보가 있으면 로드, 그렇지 않으면 fetcher 실행

  // 프로필 이미지를 선택하여 업로드하는 함수
  const handleImageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleProfileImageUpload(file);
    }
  };
  // 프로필 이미지를 선택하여 업로드하는 함수

  return (
    <div>
      <StyledHeading>내 인사정보</StyledHeading>
      <Contents>
        <ProfileBox>
          <UserImgBox>
            <img src={userInfo[0]?.profileImageUrl} alt="" />
          </UserImgBox>

          <div>
            <Button
              colorScheme="teal"
              as="label"
              htmlFor="userProfileImgUpload"
              cursor="pointer"
            >
              이미지 선택
            </Button>
            <input
              id="userProfileImgUpload"
              type="file"
              onChange={handleImageInputChange}
              style={{ display: "none" }}
            />
          </div>
        </ProfileBox>
        <TableContainer
          borderRadius="12px"
          borderTop="1px solid"
          borderRight="1px solid"
          borderLeft="1px solid"
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
