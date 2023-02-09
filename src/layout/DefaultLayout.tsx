import { Outlet } from "react-router-dom";
import styled from "styled-components";

const DefaultLayout = () => {
  return (
    <DefaultContainer>
      <Outlet />
    </DefaultContainer>
  );
};

export default DefaultLayout;

const DefaultContainer = styled.div`
  padding: 20px;
`;
