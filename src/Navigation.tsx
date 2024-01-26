import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { GnbTimer } from './component/common/gnb/GnbTimer';
import GnbChart from './component/common/gnb/GnbChart';
import GnbAllStudy from './component/common/gnb/GnbAllStudy';
import GnbMyStudy from './component/common/gnb/GnbMyStudy';
import GnbSetting from './component/common/gnb/GnbSetting';

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
          <GnbTimer active={currentPath === 'timer'} />
        </Link>
      </GNBIcon>
      <GNBIcon>
        <Link to={'chart'}>
          <GnbChart active={currentPath === 'chart'} />
        </Link>
      </GNBIcon>
      <GNBIcon>
        <Link to={'allstudies'}>
          <GnbAllStudy active={currentPath === 'allstudies'} />
        </Link>
      </GNBIcon>
      <GNBIcon>
        <Link to={'mystudy'}>
          <GnbMyStudy active={currentPath === 'mystudy'} />
        </Link>
      </GNBIcon>
      <GNBIcon>
        <Link to={'more'}>
          <GnbSetting active={currentPath === 'more'} />
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

  @media screen and (max-width: 360px) {
    gap: unset;
    justify-content: space-evenly;
  }
`;

const GNBIcon = styled.div`
  margin-top: 6px;
  width: 48px;
  height: 48px;
  text-align: center;
`;
