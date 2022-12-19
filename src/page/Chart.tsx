import styled from "styled-components";
import { DDayIcon, AlarmIcon } from "../style/icon/chartPage";
import { ReactComponent as ViewMoreIcon } from "../style/icon/viewmore_icon.svg";
import DayChart from "../component/chart/DayChart";
import WeekChart from "../component/chart/WeekChart";
import MonthChart from "../component/chart/MonthChart";
import { useState } from "react";

const Chart = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const chartPeriod = [
    { period: "일", content: <DayChart />, id: 1 },
    { period: "주", content: <WeekChart />, id: 2 },
    { period: "월", content: <MonthChart />, id: 3 },
  ];

  return (
    <>
      <Header>
        <h1>공부 차트</h1>
        <AlarmIcon />
      </Header>

      <DDayWrapper>
        <Wrapper className="left">
          <IconWrapper>
            <DDayIcon />
          </IconWrapper>
          <DDayTitle>
            <h2> TOIEC 시험 </h2>
            <SubTitle>2022.10.20 (일)</SubTitle>
          </DDayTitle>
        </Wrapper>
        <Wrapper className="right">
          <DDay>D-35</DDay>
          <IconWrapper className="viewMore">
            <ViewMoreIcon />
          </IconWrapper>
        </Wrapper>
      </DDayWrapper>
      <CharacterBadge>캐릭터 div</CharacterBadge>
      <PeriodTabs>
        {chartPeriod.map((item) => {
          return (
            <>
              <PeriodTab
                key={item.id}
                className={currentTab === item.id ? "selected" : undefined}
                onClick={() => {
                  setCurrentTab(item.id);
                }}
              >
                {item.period}
              </PeriodTab>
            </>
          );
        })}
      </PeriodTabs>
      {chartPeriod[currentTab - 1]?.content}
    </>
  );
};

export default Chart;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0px;
  h1 {
    font-weight: 600;
    font-size: 20px;
  }
`;

const DDayWrapper = styled.div`
  background-color: #f6f6f6;
  width: 100%;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  padding-right: 0px;
  gap: 12px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  &.left {
    gap: 12px;
  }
`;

const IconWrapper = styled.div`
  background-color: #fff;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  border-radius: 8px;

  &.viewMore {
    background-color: transparent;
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
  font-weight: 700;
  font-size: 1.5rem;
`;

const CharacterBadge = styled.div`
  background-color: #e9faf7;
  border-radius: 20px;
  margin: 16px 0px 44px 0px;
`;

const PeriodTabs = styled.div`
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
  padding: 12px 46px;
  &.selected {
    background-color: #b3f0e8;
    border-radius: 16px;
  }
`;
