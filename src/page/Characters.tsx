import StackHeader from '@/component/common/StackHeader';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import instance from '@/instance';
import CharacterGroupWrapper from '@/component/characters/CharacterGroupWrapper';
import MainCharacter from '@/component/characters/MainCharacter';
import CharacterPickUpCounter from '@/component/characters/CharacterPickCounter';
import { useQuery } from 'react-query';

interface ICharacterListResponse {
  message: string;
  collectedA: number;
  collectedB: number;
  collectedC: number;
  missionTypeA: {
    codeNum: number;
    imageURL: string;
    missionType: string;
    requirement: string;
    tip: string;
    progress: string;
    collected: number;
  }[];
  missionTypeB: {
    codeNum: number;
    imageURL: string;
    missionType: string;
    requirement: string;
    tip: string;
    progress: string;
    collected: number;
  }[];
  missionTypeC: {
    codeNum: number;
    imageURL: string;
    missionType: string;
    requirement: string;
    tip: string;
    progress: string;
    collected: number;
  }[];
}

interface ICharacterMainResponse {
  message: string;
  character: {
    characterImg: string;
    codeNum: number;
    requirement: string;
  }[];
}

const Characters = () => {
  const navigate = useNavigate();

  const { data: characters } = useQuery(
    'Characters/GetCharacters',
    async () => {
      const response = await instance.get<ICharacterListResponse>(
        '/api/user/getcharacter',
      );

      console.log(response);

      return response.data;
    },
  );

  const { data: mainCharacter } = useQuery(
    'Characters/GetMainCharacter',
    async () => {
      const response = await instance.get<ICharacterMainResponse>(
        '/api/user/getmaincharacter',
      );

      return response.data.character[0];
    },
  );

  if (!mainCharacter || !characters) return null;

  return (
    <Container>
      <StackHeader
        options={{
          before: {
            iconOptions: {
              onClick: () => navigate('/chart'),
            },
          },
        }}
      >
        캐릭터 목록
      </StackHeader>
      <Content>
        <MainCharacter character={mainCharacter} />
        <SplitBox />
        <CharacterPickUpCounter
          count={
            characters?.collectedA +
            characters?.collectedB +
            characters?.collectedC
          }
        />

        <Comments>미션을 완료하고 캐릭터를 모아보세요</Comments>
        <CharacterGroupWrapper
          data={characters}
          mainId={mainCharacter?.codeNum}
        />
      </Content>
    </Container>
  );
};

export default Characters;

const SplitBox = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.bg.grey};
`;

const Comments = styled.div`
  width: 100%;
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.grey[500]};
  margin-top: 12px;
  margin-bottom: 45px;
`;

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.bg.base};
`;
