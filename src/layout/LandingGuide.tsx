import { useEffect } from "react";
import { Outlet, useMatch, useNavigate } from "react-router-dom";

const LandingGuide = () => {
  const navigate = useNavigate();
  const isFirstEnter = useMatch("/");

  //NOTE 추후에 login user / guest 분기점으로 사용
  useEffect(() => {
    if (isFirstEnter !== null) {
      navigate("/timer");
    }
  }, []);

  return <Outlet />;
};

export default LandingGuide;
