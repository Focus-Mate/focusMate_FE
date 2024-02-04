import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const RouteTransitionWrapper = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default RouteTransitionWrapper;

const Container = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  position: absolute;
  top: 0;
  left: 0;
  background-color: #ffffff;
`;
