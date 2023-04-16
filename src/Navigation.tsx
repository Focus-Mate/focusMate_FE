import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as TimerIcon } from './style/icon/GNB/timer_icon.svg';
import { ReactComponent as ChartIcon } from './style/icon/GNB/chart_icon.svg';
import { ReactComponent as AllStudyIcon } from './style/icon/GNB/all studies_icon.svg';
import { ReactComponent as MyStudyIcon } from './style/icon/GNB/my study_icon.svg';
import { ReactComponent as MoreIcon } from './style/icon/GNB/more_icon.svg';

function Navigation() {
  return (
    <GNB>
      <GNBIcon>
        <Link to={'timer'}>
          <TimerIcon />
        </Link>
      </GNBIcon>
      <GNBIcon>
        <Link to={'chart'}>
          <ChartIcon />
        </Link>
      </GNBIcon>
      <GNBIcon>
        <Link to={'allstudies'}>
          <AllStudyIcon />
        </Link>
      </GNBIcon>
      <GNBIcon>
        <Link to={'mystudy'}>
          <MyStudyIcon />
        </Link>
      </GNBIcon>
      <GNBIcon>
        <Link to={'more'}>
          <MoreIcon />
        </Link>
      </GNBIcon>
    </GNB>
  );
}

export default Navigation;

const GNB = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.base};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 75px;
  border: 1px solid ${({ theme }) => theme.colors.bg.line};
  border-bottom: 0px;
  border-radius: 24px 24px 0px 0px;
  bottom: 0;
  position: fixed;
  width: 100%;
`;

const GNBIcon = styled.div`
  width: 48px;
  height: 48px;
  text-align: center;
`;
