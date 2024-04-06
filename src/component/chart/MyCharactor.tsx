import styled from 'styled-components';
import { Button, Title } from '../../style/globalStyle';
import MyCharactorPng from '../../style/charactor/character_size_area.png';
import { useNavigate } from 'react-router-dom';

export default function MyCharactor() {
  const navigate = useNavigate();
  return (
    <Container>
      <CharactorTitle>
        주어진 목표를 달성하고 <br />
        캐릭터를 모아봐요
      </CharactorTitle>
      모은 캐릭터 1/11 <br />
      새로운 목표가 추가되었어요!
      <CharactorWrapper>
        <MyCharactorImg src={MyCharactorPng} />
      </CharactorWrapper>
      <Button onClick={() => navigate('/characters')}>
        모은 캐릭터 보러가기 ❯
      </Button>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  padding: 20px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bg.mint10};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  line-height: 1.5;
`;

const CharactorTitle = styled(Title)`
  margin-bottom: 0px;
  padding-top: 15px;
  font-size: 20px;
  line-height: 26px;
  font-family: ${({ theme }) => theme.fonts.spoqa.medium};
  color: ${({ theme }) => theme.colors.grey[900]};
`;

const CharactorWrapper = styled.div``;

const MyCharactorImg = styled.img`
  width: 100px;
  height: 100px;
`;
