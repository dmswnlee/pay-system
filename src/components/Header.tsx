import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid #e0e2e7;
`;

const MainMenu = styled.ul`
  display: flex;
  gap: 20px;
`;

const Header: React.FC = () => {
  return (
    <Nav>
      <div>
        <img src={logo} alt="logo" />
      </div>
      <MainMenu>
        <li>
          <Link to="/">로그인</Link>
        </li>
        <li>
          <Link to="/MyInfo">내 인사정보</Link>
        </li>
        <li>
          <Link to="/SalaryHistory">급여 내역</Link>
        </li>
        <li>
          <Link to="/CorrectionApply">정정 신청</Link>
        </li>
        <li>
          <Link to="/CorrectionApplyHistory">정정 내역</Link>
        </li>
        <li>
          <Link to="/WorkManagement">업무 관리</Link>
        </li>
      </MainMenu>
    </Nav>
  );
};

export default Header;
