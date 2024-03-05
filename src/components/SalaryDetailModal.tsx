import { Button, CloseButton } from "@chakra-ui/react";
import { useRef, useState } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  position: relative;
  width: 800px;
  height: 500px;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: center;
`;

const TableContainer = styled.table`
  border: 1px solid #000;
`;

const TableTitle = styled.th`
  border: 1px solid #000;
  padding: 10px;
  background-color: #e0e2e7;
`;

const TableContent = styled.td`
  border: 1px solid #000;
  padding: 10px;
`;

const IsModalCloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
`;

const SalaryDetailModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isModalClose = useRef<HTMLDivElement>(null);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === isModalClose.current) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Button colorScheme="teal" size="sm" onClick={handleModal}>
        열람하기
      </Button>
      {isModalOpen && (
        <ModalContainer ref={isModalClose} onClick={handleModalClose}>
          <ModalContent>
            <ModalTitle>2024.02.02 급여내역</ModalTitle>
            <IsModalCloseButton>
              <CloseButton onClick={handleModal} />
            </IsModalCloseButton>
            <TableContainer>
              <tbody>
                <tr>
                  <TableTitle>사원번호</TableTitle>
                  <TableContent>001</TableContent>
                  <TableTitle>성명</TableTitle>
                  <TableContent>이은주</TableContent>
                </tr>
                <tr>
                  <TableTitle>부서</TableTitle>
                  <TableContent>개발1팀</TableContent>
                  <TableTitle>직급</TableTitle>
                  <TableContent>사원</TableContent>
                </tr>
                <tr>
                  <TableTitle>입사일</TableTitle>
                  <TableContent>2023.02.02</TableContent>
                  <TableTitle>지급일자</TableTitle>
                  <TableContent>2024.02.02</TableContent>
                </tr>
              </tbody>
            </TableContainer>
            <TableContainer>
              <tbody>
                <tr>
                  <TableTitle>지급총액</TableTitle>
                  <TableContent>3,000,000</TableContent>
                  <TableTitle>공제총액</TableTitle>
                  <TableContent>300,000</TableContent>
                  <TableTitle>실지급액</TableTitle>
                  <TableContent>2,700,000</TableContent>
                </tr>
              </tbody>
            </TableContainer>
            <TableContainer>
              <thead>
                <tr>
                  <TableTitle>공제항목명</TableTitle>
                  <TableTitle>금액</TableTitle>
                  <TableTitle>비고</TableTitle>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableTitle>소득세</TableTitle>
                  <TableContent>45,000</TableContent>
                </tr>
                <tr>
                  <TableTitle>국민연금</TableTitle>
                  <TableContent>85,000</TableContent>
                </tr>
                <tr>
                  <TableTitle>건강보험</TableTitle>
                  <TableContent>100,000</TableContent>
                </tr>
                <tr>
                  <TableTitle>고용보험</TableTitle>
                  <TableContent>70,000</TableContent>
                </tr>
              </tbody>
            </TableContainer>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
};

export default SalaryDetailModal;
