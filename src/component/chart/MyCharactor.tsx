import styled from 'styled-components';
import { Button, Title } from '../../style/globalStyle';
import theme from '../../style/lightTheme';
import MyCharactorPng from '../../style/charactor/character_size_area.png';
import { useNavigate } from 'react-router-dom';
import { CharactorBtnArrow } from '../../style/icon/chartPage/index';

export default function MyCharactor() {
  const navigate = useNavigate();
  return (
    <Container>
      <CharactorTitle>
        미션을 완료하고 <br />
        캐릭터를 모아보세요!
      </CharactorTitle>
      모은 캐릭터 1/11 <br />
      <CharactorWrapper>
        <MyCharactorImg src={MyCharactorPng} />
      </CharactorWrapper>
      <CharactorBtn onClick={() => navigate('/characters')}>
        모은 캐릭터 보러가기 <CharactorBtnArrow />
      </CharactorBtn>
    </Container>
  );
}

const CharactorBtn = styled(Button)`
  font-size: 1rem;
`;

const Container = styled.div`
  text-align: center;
  padding: 20px;
  width: 100%;
  background-color: ${theme.colors.bg.mint10};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  line-height: 1.5;
`;

const CharactorTitle = styled(Title)`
  font-family: 'SpoqaMedium';
  margin-bottom: 0px;
  padding-top: 15px;
`;

const CharactorWrapper = styled.div``;

const MyCharactorImg = styled.img`
  width: 100px;
  height: 100px;
`;
