import styled from 'styled-components';

interface NewCharacterProps {
  children?: string;
  onClick?: () => void;
  character: {
    codeNum: number;
    imageURL: string;
    missionType: string;
    requirement: string;
    tip: string;
    progress: string;
    collected: number;
  };
}

const NewCharacter: React.FC<NewCharacterProps> = ({
  children,
  onClick,
  character,
}) => {
  return (
    <Container onClick={onClick}>
      <ColorBox isActive={character?.collected === 1}>
        {character?.collected === 1 && character?.imageURL && (
          <img src={character?.imageURL} alt="character" />
        )}
        {!(character?.collected === 1) && (
          <img src={character?.imageURL} alt="character" />
        )}
      </ColorBox>
      <NameBox>{children}</NameBox>
    </Container>
  );
};

export default NewCharacter;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  float: left;
`;

const ColorBox = styled.div<{
  isActive: boolean | undefined;
}>`
  width: 100%;
  padding-top: 100%;
  border-radius: 20px;
  background-color: ${({ isActive }) => (isActive ? '#b3f0e8' : '#e8e8e8')};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    object-fit: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const NameBox = styled.div`
  color: ${({ theme }) => theme.colors.grey[700]};
  font-size: 0.875rem;
`;
