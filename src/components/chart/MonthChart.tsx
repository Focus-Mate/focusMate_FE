import Calendar from '@/pages/chart/Calendar';
import PeriodSelector from './PeriodSelector';
import StudyTime from './StudyTime';
import { useQuery } from 'react-query';
import { GraphContainer, WeekRecord } from './WeekChart';
import { useRecoilValue } from 'recoil';
import { ChartDateState } from '@/store/ChartDateState';
import instance from '@/instance';
import Record from './Record';

export interface MonthRecord {
  date: number;
  dateRecord: string;
  isMinMax: 'min' | 'max' | 'none';
}

const MonthChart = () => {
  const requestDay = useRecoilValue(ChartDateState);

  const { data: monthRecord } = useQuery<WeekRecord>(
    ['monthRecord', requestDay],
    async () => {
      const response = await instance.get(
        `/api/calculate/getRecord?firstDay=${requestDay.firstDay}&lastDay=${requestDay.lastDay}`,
      );
      return response.data;
    },
    { enabled: !!requestDay.lastDay && !!requestDay.firstDay },
  );

  return (
    <GraphContainer>
      <PeriodSelector period="month" />
      <StudyTime period="month" studyTime={monthRecord ? monthRecord.avg : 0} />
      {monthRecord && <Calendar monthRecord={monthRecord} />}
      <Record
        period="월"
        min={monthRecord ? monthRecord.min : 0}
        max={monthRecord ? monthRecord.max : 0}
      />
    </GraphContainer>
  );
};

export default MonthChart;
