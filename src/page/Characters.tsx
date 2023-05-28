import StackHeader from '@/component/common/StackHeader';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useEffect, useState } from 'react';
import instance from '@/instance';
import CharacterGroupWrapper from '@/component/characters/CharacterGroupWrapper';
import MainCharacter from '@/component/characters/MainCharacter';
import CharacterPickUpCounter from '@/component/characters/CharacterPickCounter';

interface ICharacterListResponse {
  message: string;
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

  const [data, setData] = useState<ICharacterListResponse | null>(null);

  const [mainCharacter, setMainCharacter] = useState<{
    characterImg: string;
    codeNum: number;
    requirement: string;
  } | null>(null);

  useEffect(() => {
    const getCharacters = async () => {
      const response = await instance.get('/api/user/getcharacter');

      setData(response.data);
    };

    const getMainCharacter = async () => {
      const response: {
        data: {
          character: {
            codeNum: number;
            characterImg: string;
            requirement: string;
          }[];
          message: string;
        };
      } = await instance.get<ICharacterMainResponse>(
        '/api/user/getmaincharacter',
      );

      setMainCharacter(response.data.character[0]);
    };

    getCharacters();
    getMainCharacter();
  }, []);

  if (!mainCharacter) return null;

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
        <CharacterPickUpCounter />
        <CharacterGroupWrapper data={data} mainId={mainCharacter?.codeNum} />
      </Content>
    </Container>
  );
};

export default Characters;

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
  gap: 0.5rem;
`;
