import { Button, CloseButton } from "@chakra-ui/react";
import { useRef, useState } from "react";
import styled from "styled-components";
import { Employee, Salary } from "../pages/SalaryHistory";

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

interface SalaryDetailModalProps {
  employees: Employee[];
  salaryData: Salary[];
}

const SalaryDetailModal = ({
  employees,
  salaryData,
}: SalaryDetailModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isModalClose = useRef<HTMLDivElement>(null);

  console.log(employees, salaryData);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === isModalClose.current) {
      setIsModalOpen(false);
    }
  };

  const employee = employees[0];
  const salary = salaryData[0];

  return (
    <>
      <Button colorScheme="teal" size="sm" onClick={handleModal}>
        열람하기
      </Button>
      {isModalOpen && (
        <ModalContainer ref={isModalClose} onClick={handleModalClose}>
          <ModalContent>
            <ModalTitle>{salary.payrollDate} 급여내역</ModalTitle>
            <IsModalCloseButton>
              <CloseButton onClick={handleModal} />
            </IsModalCloseButton>
            <TableContainer>
              <tbody>
                <tr>
                  <TableTitle>사원번호</TableTitle>
                  <TableContent>{employee.memNo}</TableContent>
                  <TableTitle>성명</TableTitle>
                  <TableContent>{employee.name}</TableContent>
                </tr>
                <tr>
                  <TableTitle>부서</TableTitle>
                  <TableContent>{employee.team}</TableContent>
                  <TableTitle>직급</TableTitle>
                  <TableContent>{employee.position}</TableContent>
                </tr>
                <tr>
                  <TableTitle>입사일</TableTitle>
                  <TableContent>{employee.dateOfJoin}</TableContent>
                  <TableTitle>지급일자</TableTitle>
                  <TableContent>{salary.payrollDate}</TableContent>
                </tr>
              </tbody>
            </TableContainer>
            <TableContainer>
              <tbody>
                <tr>
                  <TableTitle>지급총액</TableTitle>
                  <TableContent>{salary.totalPaymentAmount}</TableContent>
                  <TableTitle>공제총액</TableTitle>
                  <TableContent>{salary.netPaymentAmount}</TableContent>
                  <TableTitle>실지급액</TableTitle>
                  <TableContent>{salary.netPaymentAmount}</TableContent>
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
                  <TableContent>{salary.incomeTax}</TableContent>
                </tr>
                <tr>
                  <TableTitle>국민연금</TableTitle>
                  <TableContent>{salary.nationalPension}</TableContent>
                </tr>
                <tr>
                  <TableTitle>건강보험</TableTitle>
                  <TableContent>{salary.healthInsurance}</TableContent>
                </tr>
                <tr>
                  <TableTitle>고용보험</TableTitle>
                  <TableContent>{salary.employmentInsurance}</TableContent>
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
