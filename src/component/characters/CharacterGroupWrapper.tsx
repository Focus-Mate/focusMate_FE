import styled from 'styled-components';
import BottomSlideBox, { bottomSlider } from './BottomSlideBox';
import { useRecoilState } from 'recoil';
import CharacterGroup from './CharacterGroup';

interface NewCharacterGroupProps {
  data: {
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
  } | null;
  mainId: number;
}

const NewCharacterGroups: React.FC<NewCharacterGroupProps> = ({
  data,
  mainId,
}) => {
  return (
    <Wrapper>
      <Container>
        <Comments>주어진 목표를 달성하고 캐릭터를 모아봐요</Comments>
        <BottomSlideBox />
        <CharacterGroup
          group={data?.missionTypeA}
          groupType="A"
          mainId={mainId}
        />
        <CharacterGroup
          group={data?.missionTypeB}
          groupType="B"
          mainId={mainId}
        />
        <CharacterGroup
          group={data?.missionTypeC}
          groupType="C"
          mainId={mainId}
        />
      </Container>
    </Wrapper>
  );
};

export default NewCharacterGroups;

const Wrapper = styled.div`
  background-color: white;
  padding: 24px 20px;
  background-color: ${({ theme }) => theme.colors.bg.base};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 340px;
  margin: 0 auto;
`;

const Comments = styled.div`
  width: 100%;
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.grey[500]};
  margin-top: 12px;
  margin-bottom: 45px;
`;
