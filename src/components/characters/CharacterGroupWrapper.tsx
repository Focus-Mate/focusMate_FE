import styled from 'styled-components';
import BottomSlideBox from './BottomSlideBox';
import CharacterGroup from './CharacterGroup';

interface NewCharacterGroupProps {
  data: {
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
  };
  mainId: number;
}

const NewCharacterGroups: React.FC<NewCharacterGroupProps> = ({
  data,
  mainId,
}) => {
  return (
    <Wrapper>
      <Container>
        <BottomSlideBox />
        <CharacterGroup
          group={data?.missionTypeA}
          groupType="A"
          mainId={mainId}
          count={data.collectedA}
        />
        <CharacterGroup
          group={data?.missionTypeB}
          groupType="B"
          mainId={mainId}
          count={data.collectedB}
        />
        <CharacterGroup
          group={data?.missionTypeC}
          groupType="C"
          mainId={mainId}
          count={data.collectedC}
        />
      </Container>
    </Wrapper>
  );
};

export default NewCharacterGroups;

const Wrapper = styled.div`
  background-color: white;
  padding: 0px 20px;
  background-color: ${({ theme }) => theme.colors.bg.base};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 340px;
  margin: 0 auto;
`;
