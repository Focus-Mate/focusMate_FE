import PeriodSelector from '@/component/chart/PeriodSelector';
import { week, WeekDay } from '@/util';
import styled from 'styled-components';

export default function Calendar() {
  return (
    <>
      <OneWeekContainer>
        {week.map((key, index) => {
          return <OneDayBox>{week[index]}</OneDayBox>;
        })}
      </OneWeekContainer>
      <OneWeekContainer>
        <OneDayBox />
        <OneDayBox />
        <OneDayBox />
        <OneDayBox />
        <OneDayBox />
        <OneDayBox />
        <OneDayBox />
      </OneWeekContainer>
    </>
  );
}

const CalendarContainer = styled.div`
  width: 100%;
`;

const OneWeekContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const OneDayBox = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: center;
`;
