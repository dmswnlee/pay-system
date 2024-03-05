import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <nav>
      <ul>
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
      </ul>
    </nav>
  );
};

export default Header;
