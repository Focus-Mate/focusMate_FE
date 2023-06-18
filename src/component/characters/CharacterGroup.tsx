import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { bottomSlider } from './BottomSlideBox';
import CharacterItem from './CharacterItem';

interface NewCharacterGroupProps {
  group?: {
    codeNum: number;
    imageURL: string;
    missionType: string;
    requirement: string;
    tip: string;
    progress: string;
    collected: number;
  }[];
  groupType: string;
  mainId: number;
  count: number;
}

const NewCharacterGroup: React.FC<NewCharacterGroupProps> = ({
  group,
  groupType,
  mainId,
  count,
}) => {
  const [, setSlider] = useRecoilState(bottomSlider);

  return (
    <Container>
      <CharacterGroupHeader>
        <Subject>
          {groupType === 'A' && '시작이 반! 기능 써보기'}
          {groupType === 'B' && '연속 출석 기록 달성하기'}
          {groupType === 'C' && '누적 최고 공부기록 도전!'}
        </Subject>
        <Count>
          {count}/{group?.length}
        </Count>
      </CharacterGroupHeader>
      {groupType === 'B' && (
        <CharacterGroupComment>
          타이머 기록을 저장하면 출석으로 자동 체크됩니다
        </CharacterGroupComment>
      )}
      <CharacterItems>
        {group?.map(group => {
          return (
            <CharacterItem
              character={group}
              key={group.codeNum}
              onClick={() =>
                setSlider({
                  icon: group.imageURL,
                  isActive: true,
                  hasCharacter: group.collected === 1,
                  isRepresentative: mainId === group.codeNum,
                  title: group.requirement,
                  description: group.progress,
                  tips: group.tip,
                  codeNum: group.codeNum,
                })
              }
            >
              {group.requirement}
            </CharacterItem>
          );
        })}
      </CharacterItems>
    </Container>
  );
};

export default NewCharacterGroup;

const Container = styled.div`
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

const Subject = styled.div`
  font-size: 1.25rem;
  font-family: ${({ theme }) => theme.fonts.spoqa.medium};
`;

const Count = styled.div`
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
