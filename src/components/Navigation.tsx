import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { GnbTimer } from './common/gnb/GnbTimer';
import GnbChart from './common/gnb/GnbChart';
import GnbAllStudy from './common/gnb/GnbAllStudy';
import GnbMyStudy from './common/gnb/GnbMyStudy';
import GnbSetting from './common/gnb/GnbSetting';
import { useSetRecoilState } from 'recoil';
import { navAtoms } from './Navigation.atoms';

function Button({ to, children }: { to: string; children: React.ReactNode }) {
  const setPageMoveTarget = useSetRecoilState(navAtoms.pageMoveTarget);

  return (
    <ButtonComp
      onClick={() => {
        setPageMoveTarget(to);
      }}
    >
      {children}
    </ButtonComp>
  );
}

const ButtonComp = styled.div``;

function Navigation() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState<string>();

  useEffect(() => {
    setCurrentPath(location.pathname.substring(1));
  }, [location]);

  return (
    <Container>
      <GNB>
        <GNBIcon>
          <Button to={'/timer'}>
            <GnbTimer active={currentPath === 'timer'} />
          </Button>
        </GNBIcon>
        <GNBIcon>
          <Button to={'/chart'}>
            <GnbChart active={currentPath === 'chart'} />
          </Button>
        </GNBIcon>
        <GNBIcon>
          <Button to={'/allstudies'}>
            <GnbAllStudy active={currentPath === 'allstudies'} />
          </Button>
        </GNBIcon>
        <GNBIcon>
          <Button to={'/mystudy'}>
            <GnbMyStudy active={currentPath === 'mystudy'} />
          </Button>
        </GNBIcon>
        <GNBIcon>
          <Button to={'/more'}>
            <GnbSetting active={currentPath === 'more'} />
          </Button>
        </GNBIcon>
      </GNB>
    </Container>
  );
}

export default Navigation;

const Container = styled.div``;

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
  width: 100%;
  position: fixed;

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
