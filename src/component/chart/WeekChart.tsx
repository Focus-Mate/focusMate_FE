import styled from 'styled-components';
import StudyTime from './StudyTime';
import { BestRecordIcon, WorstRecordIcon } from '@/style/icon/chartPage/index';
import PeriodSelector from './PeriodSelector';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { ChartDateState } from '@/store/ChartDateState';
import instance from '@/axios';
import { isFuture, msToTime, week } from '@/util';
import { useEffect, useState } from 'react';

interface WeekRecord {
  avg: number;
  max: number;
  message: string;
  min: number;
  result: RecordResult[];
}

interface RecordResult {
  studyDate: string;
  total: string;
}

type NumberMap = { [key: number]: number };

const WeekChart = () => {
  const requestDay = useRecoilValue(ChartDateState);
  const [isOffDay, setIsOffDay] = useState<boolean>(false);
  const [minTime, setMinTime] = useState<string>();
  const [maxTime, setMaxTime] = useState<string>();
  const [chartArray, setChartArray] = useState<number[]>([]);
  const [ratioArray, setRatioArray] = useState<NumberMap[]>([]);

  const checkMinMax = () => {
    let weekTotalArray = [];
    if (weekRecord && weekRecord.result) {
      for (const element of weekRecord.result) {
        if (element.total !== '0') {
          weekTotalArray.push(Number(element.total));
        }
        // weekTotalArray.push(Number(element.total));
      }
      if (weekTotalArray.length < 7) {
        setIsOffDay(true);
      }
      setMaxTime(String(Math.max(...weekTotalArray)));
      setMinTime(String(Math.min(...weekTotalArray)));
    }
  };

  const { data: weekRecord } = useQuery<WeekRecord>(
    ['weekRecord', requestDay],
    async () => {
      const response = await instance.get(
        `/api/calculate/getRecord?firstDay=${requestDay.firstDay}&lastDay=${requestDay.lastDay}`,
      );
      return response.data;
    },
  );

  function calculateValues(numbers: number[]): { [key: number]: number }[] {
    const nonZeroNumbers = numbers.filter(num => num !== 0);

    const maxNumber = Math.max(...nonZeroNumbers);
    const minNumber = Math.min(...nonZeroNumbers);

    const sum = nonZeroNumbers.reduce((acc, num) => acc + num, 0);
    const ratios = nonZeroNumbers.map(num => Math.floor((num / sum) * 97) + 33);

    const result: { [key: number]: number }[] = [];

    for (let i = 0; i < numbers.length; i++) {
      const num = numbers[i];
      if (num === 0) {
        result.push({ [num]: 6 });
      } else if (num === maxNumber) {
        result.push({ [num]: 130 });
      } else if (num === minNumber) {
        result.push({ [num]: 32 });
      } else {
        const ratio = ratios[nonZeroNumbers.indexOf(num)];
        result.push({ [num]: ratio });
      }
    }
    return result;
  }

  useEffect(() => {
    weekRecord && checkMinMax();
    setChartArray([]);
    if (weekRecord && weekRecord.result) {
      for (const element of weekRecord.result) {
        chartArray.push(Number(element.total));
      }
      setRatioArray(calculateValues(chartArray));
    }
  }, [weekRecord]);

  useEffect(() => {
    console.log(chartArray);
    console.log(ratioArray);
  }, [weekRecord, ratioArray]);

  function getValueByKey(num: number): number | undefined {
    for (let i = 0; i < ratioArray.length; i++) {
      const map = ratioArray[i];
      if (num in map) {
        return map[num];
      }
    }
    return undefined;
  }

  return (
    <GraphContainer>
      <PeriodSelector period="week" />

      <StudyTime period="week" studyTime={weekRecord ? weekRecord?.avg : 0} />
      <GraphDayContainer>
        {weekRecord ? (
          weekRecord.result?.map((day, index) => {
            const graphHeight = getValueByKey(Number(day.total));
            return (
              <GraphWrapper key={index}>
                <Graph
                  graphHeight={graphHeight}
                  className={
                    day.total === maxTime
                      ? 'max'
                      : day.total === minTime
                      ? isOffDay
                        ? // NOTE withOff = 공부 안한 날이 있는 주 (공부안한 날이 없다면 0이 아니고 && minTime 인 그래프가 최소로 표시됨)
                          'withOff min'
                        : 'min'
                      : isFuture(day.studyDate)
                      ? 'future'
                      : day.total === '0'
                      ? 'zero'
                      : ''
                  }
                />
                <div>{week[index]}</div>
              </GraphWrapper>
            );
          })
        ) : (
          <GraphWrapper></GraphWrapper>
        )}
      </GraphDayContainer>
      <RecordWrapper>
        <RecordContainer className={'best'}>
          <RecordTitle>
            <IconBase className={'best'}>
              <BestRecordIcon />
            </IconBase>
            주 최고기록
          </RecordTitle>

          <span>{weekRecord ? msToTime(weekRecord?.max) : '00:00:00'}</span>
        </RecordContainer>
        <RecordContainer className={'worst'}>
          <RecordTitle>
            <IconBase className={'worst'}>
              <WorstRecordIcon />
            </IconBase>
            주 최저 기록
          </RecordTitle>
          <span>{weekRecord ? msToTime(weekRecord?.min) : '00:00:00'}</span>
        </RecordContainer>
      </RecordWrapper>
    </GraphContainer>
  );
};

export default WeekChart;

const GraphContainer = styled.div`
  width: 100%;
  margin-bottom: 100px;
`;

const GraphDayContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  height: 130px;
`;

const GraphWrapper = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

interface GraphHeight {
  graphHeight?: number;
}

const Graph = styled.div<GraphHeight>`
  border-radius: 12px;
  width: 28px;
  height: ${props => `${props.graphHeight}px`};
  background-color: ${({ theme }) => theme.colors.primary[500]};

  &.max {
    background-color: ${({ theme }) => theme.colors.primary[700]};
    height: 130px;
  }

  &.min {
    background-color: ${({ theme }) => theme.colors.orange[700]};
    height: 34px;
  }

  &.zero {
    background-color: ${({ theme }) => theme.colors.orange[700]};
    height: 6px;
  }

  &.withOff {
    background-color: ${({ theme }) => theme.colors.primary[500]};
  }

  &.future {
    height: 6px;
    background-color: ${({ theme }) => theme.colors.bg.grey};
  }
`;

const RecordWrapper = styled.div`
  margin-top: 44px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const RecordContainer = styled.div`
  border-radius: 16px;
  font-family: 'SpoqaMedium';
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
