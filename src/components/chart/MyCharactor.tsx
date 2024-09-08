import styled from 'styled-components';
import { Button, Title } from '@/styles/globalStyle';
import { useNavigate } from 'react-router-dom';
import { CharactorBtnArrow } from '../../assets/icon/chartPage/index';
import { IconWrapper } from '@/pages/chart/Chart';
import instance from '@/instance';
import { useQuery } from 'react-query';

export default function MyCharacter() {
  const navigate = useNavigate();

  const getMyCharactorInfo = async () => {
    const response = await instance.get(`/api/character/getinfos`);
    if (response.status === 200) {
      return response.data;
    }
  };

  const { data: myCharactorData, isSuccess } = useQuery(
    'myCharInfo',
    getMyCharactorInfo,
  );

  return (
    <Container>
      <CharactorTitle>
        미션을 완료하고 <br />
        캐릭터를 모아보세요!
      </CharactorTitle>
      <CharatorCount>
        모은 캐릭터
        {isSuccess && (
          <span>
            <span>{myCharactorData.getCharacterNum} </span>/
            {myCharactorData.allCharacterNum}
          </span>
        )}
      </CharatorCount>

      <CharactorWrapper>
        {isSuccess && <MyCharactorImg src={myCharactorData.characterImg} />}
      </CharactorWrapper>
      <CharactorBtn onClick={() => navigate('/characters')}>
        모은 캐릭터 보러가기
        <IconWrapper size={24} className="base">
          <CharactorBtnArrow />
        </IconWrapper>
      </CharactorBtn>
    </Container>
  );
}

const CharactorBtn = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
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
  color: ${({ theme }) => theme.colors.grey[700]};
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
