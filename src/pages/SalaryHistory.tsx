import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import styled from "styled-components";
import SalaryDetailModal from "../components/SalaryDetailModal";

const MainTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
`;

const SubTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SalaryHistory = () => {
  return (
    <MainContainer>
      <MainTitle>급여 내역</MainTitle>
      <SubContainer>
        <SubTitle>직원 정보</SubTitle>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>이름</Th>
                <Th>부서</Th>
                <Th>직위</Th>
                <Th>급여일</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>이은주</Td>
                <Td>FE</Td>
                <Td>사원</Td>
                <Td>2024.02.02</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </SubContainer>
      <SubContainer>
        <SubTitle>급여 명세</SubTitle>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>급여일</Th>
                <Th>지급총액</Th>
                <Th>실지급액</Th>
                <Th>급여명세확인</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>2024.02.02</Td>
                <Td>3,000,000</Td>
                <Td>2,700,000</Td>
                <Td>
                  <SalaryDetailModal />
                </Td>
              </Tr>
              <Tr>
                <Td>2024.02.02</Td>
                <Td>3,000,000</Td>
                <Td>2,700,000</Td>
                <Td>
                  <SalaryDetailModal />
                </Td>
              </Tr>
              <Tr>
                <Td>2024.02.02</Td>
                <Td>3,000,000</Td>
                <Td>2,700,000</Td>
                <Td>
                  <SalaryDetailModal />
                </Td>
              </Tr>
              <Tr>
                <Td>2024.02.02</Td>
                <Td>3,000,000</Td>
                <Td>2,700,000</Td>
                <Td>
                  <SalaryDetailModal />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </SubContainer>
    </MainContainer>
  );
};

export default SalaryHistory;
