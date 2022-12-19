import styled from "styled-components";

type StudyTimeProps = {
  period: string;
  studyTime: number;
};

const studyTimeTable = [
  { title: "day", period: "하루", total: "총" },
  { title: "week", period: "일주일", total: "평균" },
  { title: "month", period: "한 달", total: "평균" },
];

const StudyTime = (props: StudyTimeProps) => {
  const index = studyTimeTable.findIndex((item) => item.title === props.period);

  return (
    <StudyTimeWrapper>
      {studyTimeTable[index].period} {studyTimeTable[index].total} 공부시간
      <p>
        <h1>{props.studyTime}</h1>
      </p>
    </StudyTimeWrapper>
  );
};

export default StudyTime;

const StudyTimeWrapper = styled.div`
  text-align: center;
  color: #555;
  margin-bottom: 44px;
  p {
    margin-top: 5px;
    color: #111;
  }
  h1 {
    font-weight: 700;
    font-size: 36px;
  }
`;
