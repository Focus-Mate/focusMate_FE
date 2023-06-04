import { formatSeconds, msToTime } from '@/util';
import styled from 'styled-components';

type StudyTimeProps = {
  period: string;
  studyTime: number;
};

const studyTimeTable = [
  { title: 'day', period: '하루', total: '총' },
  { title: 'week', period: '일주일', total: '평균' },
  { title: 'month', period: '한 달', total: '평균' },
];

const StudyTime = ({ period, studyTime }: StudyTimeProps) => {
  console.log(studyTime);
  const index = studyTimeTable.findIndex(item => item.title === period);

  return (
    <StudyTimeWrapper>
      {studyTimeTable[index].period} {studyTimeTable[index].total} 공부시간
      <h1>{formatSeconds(studyTime)}</h1>
    </StudyTimeWrapper>
  );
};

export default StudyTime;

const StudyTimeWrapper = styled.div`
  text-align: center;
  margin-bottom: 44px;

  h1 {
    margin-top: 16px;
    font-weight: 500;
    font-size: 2.25rem;
  }
`;
