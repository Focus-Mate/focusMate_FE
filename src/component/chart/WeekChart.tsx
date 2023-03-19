import styled from "styled-components";
import StudyTime from "./StudyTime";
import { BestRecordIcon, WorstRecordIcon } from "@/style/icon/chartPage/index";

const WeekChart = () => {
  const week = ["월", "화", "수", "목", "금", "토", "일"];
  return (
    <GraphContainer>
      <StudyTime period="week" studyTime={125346} />
      <GraphDayContainer>
        {week.map((day) => {
          return (
            <GraphWrapper>
              <Graph />
              <div>{day}</div>
            </GraphWrapper>
          );
        })}
      </GraphDayContainer>
      <RecordWrapper>
        <RecordContainer className={"best"}>
          <RecordTitle>
            <IconBase className={"best"}>
              <BestRecordIcon />
            </IconBase>
            주 최고기록
          </RecordTitle>

          <span>09:12:05</span>
        </RecordContainer>
        <RecordContainer className={"worst"}>
          <RecordTitle>
            <IconBase className={"worst"}>
              <WorstRecordIcon />
            </IconBase>
            주 최저 기록
          </RecordTitle>
          <span>00:14:40</span>
        </RecordContainer>
      </RecordWrapper>
    </GraphContainer>
  );
};

export default WeekChart;

const GraphContainer = styled.div`
  width: 100%;
`;

const GraphDayContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const GraphWrapper = styled.div`
  text-align: center;
  gap: 16px;
  display: flex;
  flex-direction: column;
`;

const Graph = styled.div`
  border-radius: 12px;
  width: 28px;
  height: 50px;
  background-color: rebeccapurple;
`;

const RecordWrapper = styled.div`
  margin-top: 44px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const RecordContainer = styled.div`
  border-radius: 16px;
  font-family: "SpoqaMedium";
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 20px;

  span {
    color: ${({ theme }) => theme.colors.grey[800]};
    font-size: 1.5rem;
  }

  &.best {
    background-color: ${({ theme }) => theme.colors.bg.mint10};
    color: ${({ theme }) => theme.colors.primary[900]};
  }

  &.worst {
    background-color: ${({ theme }) => theme.colors.bg.orange};
    color: ${({ theme }) => theme.colors.icon.orange50};
  }
`;

const RecordTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconBase = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  &.best {
    background-color: ${({ theme }) => theme.colors.icon.mint10};
  }

  &.worst {
    background-color: ${({ theme }) => theme.colors.icon.orange10};
  }
`;
