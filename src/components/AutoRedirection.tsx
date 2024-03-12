import React, { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface AutoRedirectionProps {
  children: ReactNode;
}

const AutoRedirection: React.FC<AutoRedirectionProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = !!sessionStorage.getItem("uid");

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== "/") {
      navigate("/"); // 로그인 페이지로 리디렉션
    }
  }, [isAuthenticated, location.pathname, history]);

  return <>{children}</>;
};

export default AutoRedirection;
