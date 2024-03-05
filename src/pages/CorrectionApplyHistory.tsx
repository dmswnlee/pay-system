import styled from 'styled-components';

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
`;

const Text = styled.span`
  padding: 12px 24px;
  border-top: solid 1px #e2e8f0;
`;
const CorrectionApplyHistory = () => {
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
        <Row>
          <Text>2024.02.02</Text>
          <Text>보너스 미지급</Text>
          <Text></Text>
          <Text>결제 대기</Text>
        </Row>
      </Box>
    </div>
  );
};

export default CorrectionApplyHistory;
