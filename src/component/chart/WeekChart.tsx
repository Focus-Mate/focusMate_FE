import styled from 'styled-components';
import StudyTime from './StudyTime';
import { BestRecordIcon, WorstRecordIcon } from '@/style/icon/chartPage/index';
import PeriodSelector from './PeriodSelector';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { ChartDateState } from '@/store/ChartDateState';
import instance from '@/instance';
import { msToTime } from '@/util';
import { useState } from 'react';

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

const WeekChart = () => {
  const week = ['월', '화', '수', '목', '금', '토', '일'];
  const requestDay = useRecoilValue(ChartDateState);

  const { data: weekRecord, isLoading: isWeekRecordLoading } =
    useQuery<WeekRecord>(['weekRecord', requestDay.firstDay], async () => {
      const response = await instance.get(
        `/api/calculate/getRecord?firstDay=${requestDay.firstDay}&lastDay=${requestDay.lastDay}`,
      );
      console.log(response);
      return response.data;
    });

  function calculateHeight(studyTime: number): number {
    if (weekRecord && studyTime !== 0 && studyTime) {
      console.log(studyTime, 'studyTime');
      const maxHeight = 130;
      const minHeight = 30;

      const sum = weekRecord.result.reduce(
        (acc, cur) => acc + parseInt(cur.total),
        0,
      );
      console.log(sum, 'sum');
      console.log(typeof sum);
      const ratio = studyTime / sum;
      console.log(ratio, 'ratio');
      const height = Math.max(minHeight, maxHeight * ratio);
      console.log(height, 'height');
      return height;
    } else {
      const height = 6;
      return height;
    }
  }

  if (!isWeekRecordLoading && weekRecord) {
    return (
      <GraphContainer>
        <PeriodSelector period="week" />
        <StudyTime period="week" studyTime={weekRecord?.avg} />
        <GraphDayContainer>
          {weekRecord.result?.map((day, index) => {
            const height = calculateHeight(parseInt(day.total));
            console.log(height);
            return (
              <GraphWrapper>
                <Graph graphHeight={height} />
                <div>{week[index]}</div>
              </GraphWrapper>
            );
          })}
        </GraphDayContainer>
        <RecordWrapper>
          <RecordContainer className={'best'}>
            <RecordTitle>
              <IconBase className={'best'}>
                <BestRecordIcon />
              </IconBase>
              주 최고기록
            </RecordTitle>

            <span>{msToTime(weekRecord?.max)}</span>
          </RecordContainer>
          <RecordContainer className={'worst'}>
            <RecordTitle>
              <IconBase className={'worst'}>
                <WorstRecordIcon />
              </IconBase>
              주 최저 기록
            </RecordTitle>
            <span>{msToTime(weekRecord?.min)}</span>
          </RecordContainer>
        </RecordWrapper>
      </GraphContainer>
    );
  } else return <>loading ... </>;
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
`;

const GraphWrapper = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

interface GraphHeight {
  graphHeight: number;
}

const Graph = styled.div<GraphHeight>`
  border-radius: 12px;
  width: 28px;
  height: ${props => `${props.graphHeight}px`};
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
