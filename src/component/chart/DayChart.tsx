import ReactDatePicker from "react-datepicker";
import styled from "styled-components";
import PeriodSelector from "./PeriodSelector";
import StudyHistory from "./StudyHistory";
import StudyTime from "./StudyTime";

const DayChart = () => {
  return (
    <>
      <PeriodSelector />
      <StudyTime period="day" studyTime={1243546} />
      <SubTitle>공부 기록</SubTitle>
      <StudyHistory />
    </>
  );
};

export default DayChart;

const SubTitle = styled.p`
  color: #111;
  font-weight: 600;
  margin-bottom: 26px;
`;
