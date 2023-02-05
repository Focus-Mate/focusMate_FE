import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../Navigation";

const DefaultLayout = () => {
  return (
    <>
      <LayoutContainer>
        <Outlet />
      </LayoutContainer>
      <Navigation />
    </>
  );
};

export default DefaultLayout;
const LayoutContainer = styled.div`
  padding: 20px;
`;
