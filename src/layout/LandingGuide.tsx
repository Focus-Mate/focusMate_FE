import { useEffect } from "react";
import { Outlet, useMatch, useNavigate } from "react-router-dom";

const LandingGuide = () => {
  const navigate = useNavigate();
  const isFirstEnter = useMatch("/");

  useEffect(() => {
    if (isFirstEnter !== null) {
      navigate("/timer");
    }
  }, []);
  return <Outlet />;
};

export default LandingGuide;
