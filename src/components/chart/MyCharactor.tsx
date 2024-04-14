import styled from 'styled-components';
import { Button, Title } from '@/styles/globalStyle';
import MyCharactorPng from '@/assets/character/character_size_area.png';
import { useNavigate } from 'react-router-dom';
import { CharactorBtnArrow } from '../../assets/icon/chartPage/index';

export default function MyCharacter() {
  const navigate = useNavigate();
  const myCharactorCount = 1;
  const totalCharactorCount = 11;
  return (
    <Container>
      <CharactorTitle>
        미션을 완료하고 <br />
        캐릭터를 모아보세요!
      </CharactorTitle>
      <CharatorCount>
        모은 캐릭터
        <span>
          <span>{myCharactorCount}</span>/{totalCharactorCount}
        </span>
      </CharatorCount>

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
  background-color: ${({ theme }) => theme.colors.bg.mint10};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  line-height: 1.5;
`;

const CharatorCount = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;

  & > span {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.grey[500]};

    & > span {
      font-weight: 700;
      color: ${({ theme }) => theme.colors.primary[900]};
    }
  }
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
