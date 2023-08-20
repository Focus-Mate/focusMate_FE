import styled from 'styled-components';

import myStudyPng from '@/style/images/illust_mystudy.png';

function MyStudy() {
  return (
    <Container>
      <Content>
        <Title>
          나의 스터디 탭을
          <br />
          준비중이에요.
        </Title>
        <Description>
          '나의 스터디'에서는 팀원과
          <br />
          스터디를 함께 할 수 있어요.
        </Description>
        <Square>
          <img src={myStudyPng} alt="my study" />
        </Square>
        <TipBox>
          <TipTitle>TIP</TipTitle>
          <Comment>
            앱 사용 후기를 남겨주시면
            <br />더 멋진 서비스로 찾아올게요!
          </Comment>
        </TipBox>
        <Button>의견 남기러 가기</Button>
      </Content>
    </Container>
  );
}

export default MyStudy;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 75px);
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  background-color: ${({ theme }) => theme.colors.bg.base};
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 70px 0 40px;
  overflow-y: scroll;
`;

const Title = styled.div`
  width: 248px;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.grey[900]};
`;

const Description = styled.div`
  width: 248px;
  text-align: center;
  margin: 20px auto 0;
  line-height: 25px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey[600]};
`;

const Square = styled.div`
  width: 250px;
  height: 250px;
  margin: 70px auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TipBox = styled.div`
  width: calc(100% - 40px);
  margin: 0 auto;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.bg.mint10};
  border-radius: 16px;
  display: flex;
`;

const TipTitle = styled.div`
  width: 40px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.icon.white};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.primary[700]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Comment = styled.div`
  margin-left: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.grey[800]};
`;

const Button = styled.div`
  width: calc(100% - 40px);
  height: 48px;
  margin: 20px auto 0;
  color: ${({ theme }) => theme.colors.bg.base};
  background-color: ${({ theme }) => theme.colors.primary[700]};
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
`;
