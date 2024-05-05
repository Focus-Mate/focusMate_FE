import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const DefaultLayout = () => {
  return (
    <DefaultContainer>
      <Outlet />
    </DefaultContainer>
  );
};

export default DefaultLayout;

const DefaultContainer = styled.div`
  padding: 0px 20px;
  background-color: ${({ theme }) => theme.colors.bg.base};
  color: ${({ theme }) => theme.colors.grey[900]};
`;
