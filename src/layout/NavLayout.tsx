import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../component/Navigation';

export default function NavLayout() {
  return (
    <>
      <NavLayoutContainer>
        <Outlet />
      </NavLayoutContainer>
      <Navigation />
    </>
  );
}

const NavLayoutContainer = styled.div``;
