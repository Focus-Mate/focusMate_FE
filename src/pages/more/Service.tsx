import StackHeader from '@/components/common/StackHeader';
import ServiceTerms from '@/components/signIn/ServiceTerms';
import useNavigatePop from '@/hooks/useNavigatePop';
import styled from 'styled-components';

const Service = () => {
  const navigatePop = useNavigatePop();
  return (
    <Container>
      <StackHeader
        options={{
          line: true,
          before: {
            iconOptions: {
              onClick: () => navigatePop('/more'),
            },
          },
        }}
      >
        서비스 이용약관
      </StackHeader>
      <Content>
        <ServiceTerms />
      </Content>
    </Container>
  );
};

export default Service;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.bg.base};
`;

const Content = styled.div`
  color: ${({ theme }) => theme.colors.grey[600]};
  padding: 16px 20px;
`;
