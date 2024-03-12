import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import logo from "../assets/logo.png";
import { Dispatch } from "redux";
import { SetCurrentUserAction, setCurrentUser } from "../redux/store";
import { useDispatch } from "react-redux";
import { authService } from "../firebase";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e2e7;
`;

const MainMenu = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const StyledLink = styled(Link)<{ active?: string }>`
  color: #718096;
  font-weight: 500;
  font-size: 18px;
  &:hover {
    color: #171923;
  }
  ${(props) =>
    props.active === "true" &&
    css`
      color: #171923;
    `}
`;

const Header: React.FC = () => {
  const dispatch: Dispatch<SetCurrentUserAction> = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const isLoginPage = pathname === "/";

  const logOut = async () => {
    await authService.signOut();
    sessionStorage.removeItem("uid");
    dispatch(setCurrentUser(null));
    navigate("/");
  };

  return isLoginPage ? null : (
    <Nav>
      <MainMenu>
        <img src={logo} alt="logo" />
        <StyledLink
          active={pathname === "/MyInfo" ? "true" : "false"}
          to="/MyInfo"
        >
          내 인사정보
        </StyledLink>
        <StyledLink
          active={pathname === "/SalaryHistory" ? "true" : "false"}
          to="/SalaryHistory"
        >
          급여 내역
        </StyledLink>
        <StyledLink
          active={pathname === "/CorrectionApply" ? "true" : "false"}
          to="/CorrectionApply"
        >
          정정 신청
        </StyledLink>
        <StyledLink
          active={pathname === "/CorrectionApplyHistory" ? "true" : "false"}
          to="/CorrectionApplyHistory"
        >
          정정 내역
        </StyledLink>
        <StyledLink
          active={pathname === "/WorkManagement" ? "true" : "false"}
          to="/WorkManagement"
        >
          업무 관리
        </StyledLink>
      </MainMenu>
      <Button onClick={logOut}>로그아웃</Button>
    </Nav>
  );
};

export default Header;
