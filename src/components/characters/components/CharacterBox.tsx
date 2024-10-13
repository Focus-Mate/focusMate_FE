import { ICharacter } from '@focusmate-types/response/character';
import styled from 'styled-components';

interface Props {
  children?: string;
  onClick?: () => void;
  character: ICharacter;
}

export function CharacterBox(props: Props) {
  const { children, onClick, character } = props;

  return (
    <Container onClick={onClick}>
      <ColorBox isActive={character.collected}>
        {character.collected && character.characterImg && (
          <img src={character.characterImg} alt="character" />
        )}
        {!character?.collected && (
          <img src={character?.characterImg} alt="character" />
        )}
      </ColorBox>
      <NameBox>{children}</NameBox>
    </Container>
  );
}

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
  overflow: hidden;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary[500] : theme.colors.bg.line};
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
