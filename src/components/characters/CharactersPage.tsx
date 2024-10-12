import StackHeader from '@/components/common/StackHeader';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import MainCharacter from '@/components/characters/MainCharacter';
import { useGetCharacterList } from './hooks/useGetCharacterList';
import CharacterPickUpCounter from './components/CharacterPickCounter';
import BottomSlideBox, { bottomSlider } from './BottomSlideBox';
import { useRecoilState } from 'recoil';
import { ICharacter } from '@focusmate-types/response/character';
import { CharacterBox } from './components/CharacterBox';

export function CharactersPage() {
  const navigate = useNavigate();
  const { mainCharacter, characters } = useGetCharacterList();
  const [, setSlider] = useRecoilState(bottomSlider);

  const openSlider = (item: ICharacter) => {
    setSlider({
      icon: item.characterImg,
      isActive: true,
      hasCharacter: item.collected,
      isRepresentative: mainCharacter?.codeNum === item.codeNum,
      title: item.requirement,
      description: item.progress,
      tips: item.tip,
      codeNum: item.codeNum,
    });
  };

  if (!mainCharacter || !characters) return null;

  const count = characters.character.length;
  const groupA = characters.character.filter(item => item.missionType === 'A');
  const groupB = characters.character.filter(item => item.missionType === 'B');
  const groupC = characters.character.filter(item => item.missionType === 'C');

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
          count={characters.character.filter(item => item.collected).length}
          maxCount={count}
        />
        <Comments>미션을 완료하고 캐릭터를 모아보세요</Comments>
        <CharacterGroups>
          <CharacterGroupsContainer>
            <BottomSlideBox />
            <CharacterGroup>
              <CharacterGroupHeader>
                <CharacterGroupSubject>
                  시작이 반! 기능 써보기
                </CharacterGroupSubject>
                <CharacterGroupCount>0/{groupA?.length}</CharacterGroupCount>
              </CharacterGroupHeader>
              <CharacterItems>
                {groupA?.map(item => {
                  return (
                    <CharacterBox
                      character={item}
                      key={item.characterImg}
                      onClick={() => {
                        openSlider(item);
                      }}
                    >
                      {item.requirement}
                    </CharacterBox>
                  );
                })}
              </CharacterItems>
            </CharacterGroup>
            <CharacterGroup>
              <CharacterGroupHeader>
                <CharacterGroupSubject>
                  연속 출석 기록 달성하기
                </CharacterGroupSubject>
                <CharacterGroupCount>0/{groupB?.length}</CharacterGroupCount>
              </CharacterGroupHeader>
              <CharacterGroupComment>
                타이머 기록을 저장하면 출석으로 자동 체크됩니다
              </CharacterGroupComment>
              <CharacterItems>
                {groupB?.map(item => {
                  return (
                    <CharacterBox
                      character={item}
                      key={item.characterImg}
                      onClick={() => {
                        openSlider(item);
                      }}
                    >
                      {item.requirement}
                    </CharacterBox>
                  );
                })}
              </CharacterItems>
            </CharacterGroup>
            <CharacterGroup>
              <CharacterGroupHeader>
                <CharacterGroupSubject>
                  누적 최고 공부기록 도전!
                </CharacterGroupSubject>
                <CharacterGroupCount>0/{groupC?.length}</CharacterGroupCount>
              </CharacterGroupHeader>
              <CharacterItems>
                {groupC?.map(item => {
                  return (
                    <CharacterBox
                      character={item}
                      key={item.characterImg}
                      onClick={() => {
                        openSlider(item);
                      }}
                    >
                      {item.requirement}
                    </CharacterBox>
                  );
                })}
              </CharacterItems>
            </CharacterGroup>
          </CharacterGroupsContainer>
        </CharacterGroups>
      </Content>
    </Container>
  );
}

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

const CharacterGroups = styled.div`
  background-color: white;
  padding: 0px 20px;
  background-color: ${({ theme }) => theme.colors.bg.base};
`;

const CharacterGroupsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 340px;
  margin: 0 auto;
`;

const CharacterGroup = styled.div`
  & + & {
    margin-top: 52px;
  }

  &:last-of-type {
    padding-bottom: 56px;
  }
`;

const CharacterGroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CharacterGroupSubject = styled.div`
  font-size: 1.25rem;
  font-family: ${({ theme }) => theme.fonts.spoqa.medium};
  color: ${({ theme }) => theme.colors.grey[800]};
`;

const CharacterGroupCount = styled.div`
  font-family: ${({ theme }) => theme.fonts.spoqa.regular};
  color: ${({ theme }) => theme.colors.grey[600]};
`;

const CharacterGroupComment = styled.div`
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.grey[500]};
  font-size: 0.75rem;
`;

const CharacterItems = styled.div`
  margin-top: 24px;
  margin-bottom: 40px;

  & > div {
    width: 100px;
    margin-left: calc((100% - 300px) / 2);
  }

  @media screen and (max-width: 400px) {
    & > div {
      margin-left: 5%;
      width: 30%;
    }
  }

  & > div:nth-of-type(3n + 1) {
    margin-left: 0;
  }

  & > div:nth-of-type(n + 4) {
    margin-top: 24px;
  }
`;
