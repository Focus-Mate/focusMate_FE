import { useEffect, useState } from "react";
import { Outlet, useMatch, useMatches, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../Navigation";

const DefaultLayout = () => {
  return (
    <>
      {/*NOTE LayoutContainer === 하단 navigation에 영향 주지 않는 본문용 div */}
      <LayoutContainer>
        <Outlet />
      </LayoutContainer>
      <Navigation />
    </>
  );
};

export default DefaultLayout;

const LayoutContainer = styled.div`
  min-height: 100%;
  width: 100%;
  padding: 10px;
`;
