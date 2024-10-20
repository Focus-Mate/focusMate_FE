import styled from 'styled-components';
import {
  DDayIcon,
  AlarmIcon,
  RightArrowIcon,
} from '../../assets/icon/chartPage';
import { ReactComponent as ViewMoreIcon } from '@/assets/icon/viewmore_icon.svg';
import DayChart from '../../components/chart/DayChart';
import WeekChart from '../../components/chart/WeekChart';
import MonthChart from '../../components/chart/MonthChart';
import { useState } from 'react';
import instance from '../../instance';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import MyCharactor from '../../components/chart/MyCharactor';

import BottomModal, { SelectedDday } from '@/components/chart/BottomModal';
import useNavigationComp from '@/components/Navigation.hooks';
import { AnimatePresence, motion } from 'framer-motion';

export default function Chart() {
  const { onExitComplete, getCompareSameTarget } = useNavigationComp();

  const [visible, setVisible] = useState(false);
  const [selectedDday, selectDday] = useState<SelectedDday>({
    exam: '',
    dday: '',
  });
  const [currentTab, setCurrentTab] = useState(1);
  const navigate = useNavigate();
  const chartPeriod = [
    { period: '일', content: <DayChart />, id: 1 },
    { period: '주', content: <WeekChart />, id: 2 },
    { period: '월', content: <MonthChart />, id: 3 },
  ];

  const getDday = async () => {
    const response = await instance.get(`/api/calculate/getDDays`);
    if (response.status === 200) {
      return response.data.rows;
    }
  };

  const { data: ddayList, isSuccess } = useQuery('ddayInfo', getDday);

  // if (isLoading) {
  //   return <>loading...</>;
  // }
  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {getCompareSameTarget('/chart') && (
        <Container
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.3,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.3,
            },
          }}
        >
          <BottomModal
            visible={visible}
            selecteExam={selectedDday}
            setVisible={setVisible}
          />
          <Header>
            <h1>공부 차트</h1>
            <AlarmIcon />
          </Header>
          {isSuccess && ddayList?.length !== 0 ? (
            <>
              {ddayList?.map((item: any) => {
                const dDateData = item.eday;
                const dDate = dDateData.split('T')[0];
                return (
                  <DDayContainer key={item.exam}>
                    <Wrapper className="left">
                      <IconWrapper className="calender">
                        <CalenderIcon />
                      </IconWrapper>
                      <DDayTitle>
                        <h2> {item.exam} </h2>
                        <SubTitle>{dDate}</SubTitle>
                      </DDayTitle>
                    </Wrapper>
                    <Wrapper className="right">
                      <DDay>
                        D
                        {item.dday === 0
                          ? '-DAY'
                          : item.dday < 0
                            ? `+${Math.abs(item.dday)}`
                            : `-${item.dday}`}
                      </DDay>
                      <IconWrapper
                        className="viewMore"
                        onClick={() => {
                          setVisible(true);
                          selectDday({ exam: item.exam, dday: dDate });
                        }}
                      >
                        <ViewMoreIcon />
                      </IconWrapper>
                    </Wrapper>
                  </DDayContainer>
                );
              })}
            </>
          ) : (
            <DDayContainer
              onClick={() => {
                navigate('/makedday');
              }}
            >
              <Wrapper>
                <IconWrapper className="calender">
                  <CalenderIcon />
                </IconWrapper>
                D-DAY 추가하기
              </Wrapper>
              <Wrapper>
                <IconWrapper size={42} className="gray">
                  <RightArrowIcon />
                </IconWrapper>
              </Wrapper>
            </DDayContainer>
          )}
          <MyCharactor />

          <PeriodTabs>
            {chartPeriod.map(item => {
              return (
                <PeriodTab
                  key={item.id}
                  className={currentTab === item.id ? 'selected' : ''}
                  onClick={() => {
                    setCurrentTab(item.id);
                  }}
                >
                  {item.period}
                </PeriodTab>
              );
            })}
          </PeriodTabs>
          {chartPeriod[currentTab - 1]?.content}
        </Container>
      )}
    </AnimatePresence>
  );
}

const Container = styled(motion.div)`
  padding: 0 20px;
  background-color: ${({ theme }) => theme.colors.bg.base};
`;

const CalenderIcon = styled(DDayIcon)`
  fill: ${({ theme }) => theme.colors.primary[800]};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0px;
  h1 {
    font-family: ${({ theme }) => theme.fonts.spoqa.medium};
    font-size: 20px;
    color: ${({ theme }) => theme.colors.grey[900]};
  }
`;

const DDayContainer = styled.div`
  color: ${({ theme }) => theme.colors.grey[600]};
  font-size: 0.875rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.bg.grey};
  width: 100%;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  padding-right: 3px;
  gap: 12px;
  margin-bottom: 22px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconWrapper = styled.div<{ size?: number }>`
  width: ${({ size }) => (size ? `${size}px` : '30px')};
  height: ${({ size }) => (size ? `${size}px` : '30px')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  &.calender {
    background-color: ${({ theme }) => theme.colors.icon.mint10};
  }

  &.base {
    & > svg {
      fill: ${({ theme }) => theme.colors.bg.base};
    }
  }

  &.gray {
    & > svg {
      fill: ${({ theme }) => theme.colors.grey[500]};
    }
  }
`;

const DDayTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const SubTitle = styled.span`
  color: #8c8c8c;
  font-size: 0.8rem;
`;

const DDay = styled.div`
  color: ${({ theme }) => theme.colors.primary[900]};
  font-weight: 700;
  font-size: 1.5rem;
`;

// const CharacterBadge = styled.div`
//   background-color: #e9faf7;
//   border-radius: 20px;
//   margin: 16px 0px 44px 0px;
// `;

const PeriodTabs = styled.div`
  margin: 40px 0px 20px;
  background-color: ${({ theme }) => theme.colors.bg.grey};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.grey[600]};
`;

const PeriodTab = styled.div`
  cursor: pointer;
  text-align: center;
  width: 100%;
  padding: 12px 0px;
  &.selected {
    color: ${({ theme }) => theme.colors.grey[800]};
    background-color: ${({ theme }) => theme.colors.primary[600]};
    border-radius: 16px;
  }
`;
