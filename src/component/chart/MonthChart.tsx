import Calendar from '@/page/chart/Calendar';
import styled from 'styled-components';
import PeriodSelector from './PeriodSelector';
import StudyTime from './StudyTime';

const MonthChart = () => {
  return (
    <>
      <PeriodSelector period="week" />
      <StudyTime period="month" studyTime={234567} />
      <Calendar />
    </>
  );
};

export default MonthChart;
