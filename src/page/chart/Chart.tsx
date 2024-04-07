import styled from 'styled-components';
import {
  DDayIcon,
  AlarmIcon,
  RightArrowIcon,
} from '../../style/icon/chartPage';
import { ReactComponent as ViewMoreIcon } from '../../style/icon/viewmore_icon.svg';
import DayChart from '../../component/chart/DayChart';
import WeekChart from '../../component/chart/WeekChart';
import MonthChart from '../../component/chart/MonthChart';
import { useEffect, useState } from 'react';
import instance from '../../instance';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import MyCharactor from '../../component/chart/MyCharactor';

import BottomModal, { SelectedDday } from '@/component/chart/BottomModal';
import useNavigationComp from '@/component/Navigation.hooks';
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
    if (response.data.message === 'success') {
      return response.data.rows;
    }
  };

  const { data: ddayList } = useQuery('ddayInfo', getDday);

  useEffect(() => {
    console.log(ddayList);
  }, [ddayList]);

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
          {ddayList?.length !== 0 ? (
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
                <IconWrapper className="arrow">
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
                  className={currentTab === item.id ? 'selected' : undefined}
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
  background-color: #f6f6f6;
  width: 100%;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  padding-right: 0px;
  gap: 12px;
  margin-bottom: 22px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  border-radius: 8px;

  &.calender {
    background-color: #fff;
  }

  &.arrow {
    width: 42px;
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
  background-color: #f6f6f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
  color: #777;
`;

const PeriodTab = styled.div`
  cursor: pointer;
  text-align: center;
  width: 100%;
  padding: 12px 0px;
  &.selected {
    background-color: #b3f0e8;
    border-radius: 16px;
  }
`;
