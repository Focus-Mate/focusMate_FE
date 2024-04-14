import AlarmItem from '@/components/alarm/AlarmItem';
import StackHeader from '@/components/common/StackHeader';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import illustEmptyPush from '@/assets/images/illust_empty_push.png';

const Alarm = () => {
  const navigate = useNavigate();

  const [isView] = useState(false);

  return (
    <Container>
      <StackHeader
        options={{
          line: true,
          before: {
            iconOptions: {
              onClick: () => navigate('/more'),
            },
          },
        }}
      >
        알림
      </StackHeader>
      <Content>
        {!isView && (
          <>
            <FullSize>
              <img src={illustEmptyPush} alt="empty push" />
              <Comment>아직 도착한 알림이 없어요.</Comment>
            </FullSize>
          </>
        )}
        {isView && (
          <>
            <AlarmItem isNew />
            <AlarmItem />
          </>
        )}
      </Content>
    </Container>
  );
};

export default Alarm;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const FullSize = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  img {
    width: 150px;
  }
`;

const Comment = styled.div`
  margin-top: 24px;
  color: ${({ theme }) => theme.colors.grey[600]};
  font-size: 16px;
`;
