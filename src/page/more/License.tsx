import StackHeader from '@/component/common/StackHeader';
import useNavigatePop from '@/hooks/useNavigatePop';
import styled from 'styled-components';

const License = () => {
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
        오픈소스 라이선스
      </StackHeader>
      <Content>오픈소스 정보가 없습니다.</Content>
    </Container>
  );
};

export default License;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.bg.base};
`;

const Content = styled.div`
  padding: 20px;
  color: ${({ theme }) => theme.colors.grey[600]};
`;
