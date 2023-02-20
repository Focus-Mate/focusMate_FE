import styled from "styled-components";
import { DDayIcon, AlarmIcon } from "../../style/icon/chartPage";
import { ReactComponent as ViewMoreIcon } from "../../style/icon/viewmore_icon.svg";
import DayChart from "../../component/chart/DayChart";
import WeekChart from "../../component/chart/WeekChart";
import MonthChart from "../../component/chart/MonthChart";
import { useEffect, useState } from "react";
import axios from "axios";
import instance from "../../axios";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import MyCharactor from "../../component/chart/MyCharactor";

const Chart = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const navigate = useNavigate();
  const chartPeriod = [
    { period: "일", content: <DayChart />, id: 1 },
    { period: "주", content: <WeekChart />, id: 2 },
    { period: "월", content: <MonthChart />, id: 3 },
  ];

  const getDday = async () => {
    const response = await instance.get(`/api/calculate/getDDays`);
    console.log(response);
    return response;
  };

  const { data: ddayList, isLoading } = useQuery("ddayInfo", getDday);

  // if (isLoading) {
  //   return <>loading...</>;
  // }
  return (
    <>
      {/* <Header>
        {ddayList}
        <h1>공부 차트</h1>
        <AlarmIcon />
      </Header> */}

      {/* {ddayList.length === 0 ? (
        <DDayWrapper
          onClick={() => {
            navigate("/makedday");
          }}
        >
          <Wrapper className="left">
            <IconWrapper>
              <DDayIcon />
            </IconWrapper>
            D-DAY 추가하기
          </Wrapper>
          <Wrapper className="right">
            <IconWrapper className="viewMore">
              <ViewMoreIcon />
            </IconWrapper>
          </Wrapper>
        </DDayWrapper>
      ) : (
        <DDayWrapper>
          <Wrapper className="left">
            <IconWrapper>
              <DDayIcon />
            </IconWrapper>
            <DDayTitle>
              <h2> {ddayList[0].exam} </h2>
              <SubTitle>2022.10.20 (일)</SubTitle>
            </DDayTitle>
          </Wrapper>
          <Wrapper className="right">
            <DDay>
              D-
              {ddayList[0].dday === 0 ? "DAY" : ddayList[0].dday}
            </DDay>
            <IconWrapper className="viewMore">
              <ViewMoreIcon />
            </IconWrapper>
          </Wrapper>
        </DDayWrapper>
      )} */}

      <MyCharactor />
      <PeriodTabs>
        {chartPeriod.map((item) => {
          return (
            <PeriodTab
              key={item.id}
              className={currentTab === item.id ? "selected" : undefined}
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
  margin-top: 40px;
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
