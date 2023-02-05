import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function SignInLayout() {
  return (
    <LayoutContainer>
      <Outlet />
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  width: 100%;

  min-height: 100vh;
  position: relative;
  padding: 20px;
`;
