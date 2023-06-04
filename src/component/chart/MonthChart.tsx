import Calendar from '@/page/chart/Calendar';
import PeriodSelector from './PeriodSelector';
import StudyTime from './StudyTime';
import { useQuery } from 'react-query';
import { GraphContainer, WeekRecord } from './WeekChart';
import { useRecoilValue } from 'recoil';
import { ChartDateState } from '@/store/ChartDateState';
import instance from '@/instance';
import { useEffect, useState } from 'react';
import Record from './Record';
import { findMinMax, formatSeconds } from '@/util';
export interface MinMax {
  minDate: number[];
  maxDate: number[];
}

const MonthChart = () => {
  const requestDay = useRecoilValue(ChartDateState);
  const [dateRecord, setDateRecord] = useState<string[]>();
  const [minMaxDate, setMinMaxDate] = useState<MinMax>({
    minDate: [],
    maxDate: [],
  });
  const { data: monthRecord } = useQuery<WeekRecord>(
    ['monthRecord', requestDay],
    async () => {
      const response = await instance.get(
        `/api/calculate/getRecord?firstDay=${requestDay.firstDay}&lastDay=${requestDay.lastDay}`,
      );
      return response.data;
    },
  );

  const checkMinMaxDate = () => {
    let recordsArray = [];
    if (monthRecord) {
      for (let i = 0; i < monthRecord?.result.length; i++) {
        recordsArray.push(Number(monthRecord.result[i].total));
      }
      const { min, max } = findMinMax(recordsArray);

      for (let i = 0; i < recordsArray?.length; i++) {
        if (recordsArray[i] === min) minMaxDate.minDate.push(i + 1);
        if (recordsArray[i] === max) minMaxDate.maxDate.push(i + 1);
        return minMaxDate;
      }
    } else {
      setMinMaxDate({ minDate: [1], maxDate: [2] });
      return minMaxDate;
    }
  };

  useEffect(() => {
    if (monthRecord) {
      for (let i = 0; i < monthRecord?.result.length; i++) {
        dateRecord?.push(formatSeconds(Number(monthRecord.result[i].total)));
      }
    }
    checkMinMaxDate();
  }, [monthRecord]);

  return (
    <GraphContainer>
      <PeriodSelector period="month" />
      <StudyTime period="month" studyTime={monthRecord ? monthRecord.avg : 0} />
      <Calendar
        minMaxDate={
          minMaxDate.maxDate.length > 1
            ? minMaxDate
            : { minDate: [1, 4], maxDate: [2] }
        }
        dateRecord={
          dateRecord && dateRecord?.length > 1 ? dateRecord : ['02:10', '02:10']
        }
      />
      <Record
        period="월"
        min={monthRecord ? monthRecord.min : 0}
        max={monthRecord ? monthRecord.max : 0}
      />
    </GraphContainer>
  );
};

export default MonthChart;
