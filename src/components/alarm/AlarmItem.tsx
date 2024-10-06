import styled, { css } from 'styled-components';

import userSample from './img/user-sample.png';

interface AlarmItemProps {
  isNew?: boolean;
}

const AlarmItem: React.FC<AlarmItemProps> = ({ isNew = false }) => {
  return (
    <Item isNew={isNew}>
      <PictureArea>
        <img src={userSample} alt="sample" />
      </PictureArea>
      <Content>
        <Title>오늘은 공부 기록을 만들어 봐요~!</Title>
        <Comment>어제의 공부 기록이 없어요.</Comment>
        <Time>2분 전</Time>
      </Content>
    </Item>
  );
};

export default AlarmItem;

const Item = styled.div<{
  isNew: boolean;
}>`
  width: 100%;
  padding: 24px 20px;
  display: flex;
  background-color: ${({ theme }) => theme.colors.bg.base};

  ${({ isNew }) =>
    isNew &&
    css`
      background-color: #e9faf7;
    `}
`;

const PictureArea = styled.div`
  width: 36px;
  flex-shrink: 0;

  img {
    width: 100%;
  }
`;

const Content = styled.div`
  margin-left: 16px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grey[700]};
`;

const Comment = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.grey[600]};
  margin-top: 8px;
`;

const Time = styled.div`
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.grey[400]};
  font-size: 12px;
`;
