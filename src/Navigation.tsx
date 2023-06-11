import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  DefaultAllStudyIcon,
  DefaultChartIcon,
  DefaultMyStudyIcon,
  DefaultSettingIcon,
  DefaultTimerIcon,
  SelectedAllStudyIcon,
  SelectedChartIcon,
  SelectedMyStudyIcon,
  SelectedSettingIcon,
  SelectedTimerIcon,
} from './style/icon/GNB';
import { useEffect, useState } from 'react';

function Navigation() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState<string>();

  useEffect(() => {
    setCurrentPath(location.pathname.substring(1));
  }, [location]);

  return (
    <GNB>
      <GNBIcon>
        <Link to={'timer'}>
          {currentPath === 'timer' ? (
            <SelectedTimerIcon />
          ) : (
            <DefaultTimerIcon />
          )}
        </Link>
      </GNBIcon>
      <GNBIcon>
        <Link to={'chart'}>
          {currentPath === 'chart' ? (
            <SelectedChartIcon />
          ) : (
            <DefaultChartIcon />
          )}
        </Link>
      </GNBIcon>
      <GNBIcon>
        <Link to={'allstudies'}>
          {currentPath === 'allstudies' ? (
            <SelectedAllStudyIcon />
          ) : (
            <DefaultAllStudyIcon />
          )}
        </Link>
      </GNBIcon>
      <GNBIcon>
        <Link to={'mystudy'}>
          {currentPath === 'mystudy' ? (
            <SelectedMyStudyIcon />
          ) : (
            <DefaultMyStudyIcon />
          )}
        </Link>
      </GNBIcon>
      <GNBIcon>
        <Link to={'more'}>
          {currentPath === 'more' ? (
            <SelectedSettingIcon />
          ) : (
            <DefaultSettingIcon />
          )}
        </Link>
      </GNBIcon>
    </GNB>
  );
}

export default Navigation;

const GNB = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.base};
  display: flex;
  align-items: flex-start;
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
  margin-top: 6px;
  width: 48px;
  height: 48px;
  text-align: center;
`;
