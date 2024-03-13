import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import styled from "styled-components";
import SalaryDetailModal from "../components/SalaryDetailModal";
import { useEffect } from "react";
import { authService, firestoreService } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useLocalStorageState } from "../hook/useLocalStorageState";

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

export interface Employee {
  id: string;
  dateOfJoin: string;
  memNo: string;
  name: string;
  position: string;
  team: string;
  uid: string;
}

export interface Salary {
  id: string;
  payrollDate: string;
  paymentDate: string;
  totalPaymentAmount: string;
  netPaymentAmount: string;
  incomeTax: string;
  nationalPension: string;
  healthInsurance: string;
  employmentInsurance: string;
}

const SalaryHistory = () => {
  const [employees, setEmployees] = useLocalStorageState<Employee[]>(
    "employees",
    [],
  );
  const [salaryData, setSalaryData] = useLocalStorageState<Salary[]>(
    "salaryData",
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = authService.currentUser;
        if (user) {
          const currentUserUID = user.uid;
          const employeeQuery = query(
            collection(firestoreService, "users"),
            where("uid", "==", currentUserUID),
          );

          const employeeSnapshot = await getDocs(employeeQuery);
          const employeesData: Employee[] = employeeSnapshot.docs.map((doc) => {
            const { dateOfJoin, memNo, name, position, team, uid } = doc.data();
            return {
              id: doc.id,
              dateOfJoin,
              memNo,
              name,
              position,
              team,
              uid,
            };
          });

          const salaryQuery = query(
            collection(firestoreService, "salary"),
            where("uid", "==", currentUserUID),
          );

          const salarySnapshot = await getDocs(salaryQuery);
          const salaryData: Salary[] = salarySnapshot.docs.map((doc) => {
            const {
              payrollDate,
              paymentDate,
              totalPaymentAmount,
              netPaymentAmount,
              incomeTax,
              nationalPension,
              healthInsurance,
              employmentInsurance,
              uid,
            } = doc.data();
            return {
              id: doc.id,
              payrollDate,
              paymentDate,
              totalPaymentAmount,
              netPaymentAmount,
              incomeTax,
              nationalPension,
              healthInsurance,
              employmentInsurance,
              uid,
            };
          });

          setEmployees(employeesData);
          setSalaryData(salaryData);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchData();
  }, []);

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
                <Th>입사일</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees.map((employee) => (
                <Tr key={employee.id}>
                  <Td>{employee.name}</Td>
                  <Td>{employee.team}</Td>
                  <Td>{employee.position}</Td>
                  <Td>{employee.dateOfJoin}</Td>
                </Tr>
              ))}
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
              {salaryData.map((salary) => (
                <Tr key={salary.id}>
                  <Td>{salary.payrollDate}</Td>
                  <Td>{salary.totalPaymentAmount}</Td>
                  <Td>{salary.netPaymentAmount}</Td>
                  <Td>
                    <SalaryDetailModal
                      employees={employees}
                      salaryData={salaryData}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </SubContainer>
    </MainContainer>
  );
};

export default SalaryHistory;
