import styled, { css, keyframes } from "styled-components";

import iconArrowDown from "@/style/icon/more/arrow_down.png";
import { useState } from "react";

interface SlideBoxProps {
  item: { title: string; description: string; date: string };
}

const SlideBox: React.FC<SlideBoxProps> = ({ item }): React.ReactElement => {
  const [isShown, setShown] = useState(false);

  return (
    <Container onClick={() => setShown((isShown) => !isShown)}>
      <Alway>
        <DownIcon src={iconArrowDown} alt="show" isShown={isShown} />
        <Subject>{item.title}</Subject>
        <Day>{item.date}</Day>
      </Alway>
      <Description isShown={isShown}>{item.description}</Description>
    </Container>
  );
};

export default SlideBox;

const Container = styled.div`
  width: 100%;
  position: relative;
`;

interface hasIsShown {
  isShown: boolean;
}

const Alway = styled.div`
  padding: 20px;
`;

const DownIcon = styled.img<hasIsShown>(({ isShown }) => [
  css`
    position: absolute;
    width: 12px;
    right: 20px;
    top: 20px;
    transition: transform 0.3s;
  `,
  isShown &&
    css`
      transform: rotate(180deg);
    `,
]);

const Subject = styled.div`
  font-weight: 500;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.grey[700]};
`;

const Day = styled.div`
  font-weight: 500;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.grey[700]};
  margin-top: 12px;
`;

const FontAnimation = keyframes`
  0% {
    font-size: 0;
  }

  99% {
    font-size: 0;
  }

  100% {
    font-size: 0.875rem;
  }
`;

const Description = styled.div<hasIsShown>(({ isShown }) => [
  css`
    background-color: ${({ theme }) => theme.colors.bg.grey};
    padding: 20px;
    color: ${({ theme }) => theme.colors.grey[600]};
    transition: line-height 0.3s, padding 0.3s;
    display: none;
    font-size: 0.875rem;
    line-height: 24px;
  `,
  isShown &&
    css`
      display: block;
    `,
]);
