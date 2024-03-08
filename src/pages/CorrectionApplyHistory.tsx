import {
  useEffect,
  useState,
} from 'react';

import { Unsubscribe } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import styled from 'styled-components';

import { Button } from '@chakra-ui/react';

import {
  authService,
  firestoreService,
} from '../firebase';

const Title = styled.h1`
  font-size: 32px;
  margin-top: 58px;
  margin-bottom: 64px;
`;
const Box = styled.div`
  border-radius: 12px;
  border: solid 1px #e2e8f0;
  width: 100%;
  min-height: 100px;
  padding: 12px;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const TopText = styled.span`
  font-weight: 700;
  padding: 12px 24px;
  color: #2d3748;
`;

const Text = styled.span`
  padding: 12px 24px;
  border-top: solid 1px #e2e8f0;
  color: #2d3748;
`;
const StatusRow = styled.div`
  padding: 12px 24px;
  border-top: solid 1px #e2e8f0;
  color: #2d3748;

  display: flex;
  justify-content: space-between;
`;

export interface HistoryType {
  applyDate: string;
  content: string;
  status: string;
  uid: string;
  id: string;
}
const CorrectionApplyHistory = () => {
  const user = authService.currentUser;
  const [info, setInfo] = useState<HistoryType[]>(() => {
    const storedInfo = localStorage.getItem("info");
    return storedInfo ? JSON.parse(storedInfo) : [];
  });
  useEffect(() => {
    let unsubscribe: Unsubscribe | null;
    const fetchTweets = async () => {
      const historyQuery = query(
        collection(firestoreService, "correctionapplyhistory"),
        where("uid", "==", user?.uid),
        // orderBy("createdAt", "desc"),
        // limit(10),
      );

      unsubscribe = await onSnapshot(historyQuery, (snapshot) => {
        const datas = snapshot.docs.map((doc) => {
          const { applyDate, content, status, uid } = doc.data();
          return {
            applyDate,
            content,
            status,
            uid,
            id: doc.id,
          };
        });
        setInfo(datas);
        localStorage.setItem("info", JSON.stringify(datas));
      });
    };
    console.log(user?.uid);
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  const onDelete = async (id: string) => {
    // const ok = confirm("정말로 삭제하시겠습니까?");

    // if (!ok) return;
    try {
      await deleteDoc(doc(firestoreService, "correctionapplyhistory", id));
    } catch (e) {
      console.log(e);
    } finally {
      //}
    }
  };

  return (
    <div>
      <Title>정정 내역</Title>
      <Box>
        <Row>
          <TopText>날짜</TopText>
          <TopText>내용</TopText>
          <TopText>비고</TopText>
          <TopText>상태</TopText>
        </Row>

        {info?.map((info) => (
          <Row key={info.id}>
            <Text>{info.applyDate}</Text>
            <Text>{info.content}</Text>
            <Text></Text>
            <StatusRow>
              {info.status}
              <Button
                onClick={() => onDelete(info.id)}
                colorScheme="red"
                size="xs"
              >
                삭제
              </Button>
            </StatusRow>
          </Row>
        ))}
      </Box>
    </div>
  );
};

export default CorrectionApplyHistory;
