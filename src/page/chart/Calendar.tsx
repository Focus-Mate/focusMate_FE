import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/ko';
import weekdayPlugin from 'dayjs/plugin/weekday';
import objectPlugin from 'dayjs/plugin/toObject';
import isTodayPlugin from 'dayjs/plugin/isToday';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { CurrentDateState } from '@/store/CurrentDateState';
import { WeekRecord } from '@/component/chart/WeekChart';
import { formatSecondsToTime } from '@/util';

interface CalendarProps {
  monthRecord: WeekRecord;
}

export interface IMonthResult {
  studyDate: string;
  total: string;
}

export interface IMinxMax {
  min: number;
  max: number;
}

const Calendar = ({ monthRecord }: CalendarProps) => {
  const currentDate = useRecoilValue(CurrentDateState);
  const now = dayjs(currentDate.currentDate).locale({ ...locale });
  const [monthRecords, setMonthRecords] = useState<IMonthResult[]>();
  const [minMax, setMinMax] = useState<IMinxMax>();

  dayjs.extend(weekdayPlugin);
  dayjs.extend(objectPlugin);
  dayjs.extend(isTodayPlugin);

  useEffect(() => {
    if (!monthRecord) {
      return;
    }
    setMonthRecords(monthRecord.result);
    setMinMax({ min: monthRecord.min, max: monthRecord.max });
  }, [monthRecord]);

  const [currentMonth, setCurrentMonth] = useState(now);
  const [arrayOfDays, setArrayOfDays] = useState<any>([]);

  useEffect(() => {
    setCurrentMonth(dayjs(currentDate.currentDate).locale({ ...locale }));
  }, [currentDate]);

  const renderDays = () => {
    const dateFormat = 'dd';
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(<WeekDay key={i}>{now.weekday(i).format(dateFormat)}</WeekDay>);
    }
    return <WeekContainer className="days row">{days}</WeekContainer>;
  };

  const getAllDays = () => {
    let currentDate = currentMonth.startOf('month').weekday(0);
    const nextMonth = currentMonth.add(1, 'month').month();

    let allDates = [];
    let weekDates = [];

    let weekCounter = 1;

    while (currentDate.weekday(0).toObject().months !== nextMonth) {
      const formated = formateDateObject(currentDate);

      weekDates.push(formated);

      if (weekCounter === 7) {
        allDates.push({ dates: weekDates });
        weekDates = [];
        weekCounter = 0;
      }

      weekCounter++;
      currentDate = currentDate.add(1, 'day');
    }

    setArrayOfDays(allDates);
  };

  useEffect(() => {
    getAllDays();
  }, [currentMonth]);

  const renderCells = () => {
    const rows: any = [];
    let days: any = [];

    arrayOfDays.forEach((week: any, index: number) => {
      week.dates.forEach((d: any, i: number) => {
        days.push(
          <DayContainer
            className={
              !d.isCurrentMonth
                ? 'hidden'
                : d.isCurrentDay
                ? 'today'
                : d.isFuture
                ? 'disabled'
                : ''
            }
            key={i}
          >
            <DateNumber>
              {monthRecords && monthRecords[d.day - 1] && (
                <div
                  className={
                    Number(monthRecords[d.day - 1].total) === minMax?.min
                      ? 'min'
                      : Number(monthRecords[d.day - 1].total) === minMax?.max
                      ? 'max'
                      : ''
                  }
                />
              )}

              {d.day}
            </DateNumber>
            {monthRecords && monthRecords[d.day - 1] && (
              <DateRecord
                className={
                  Number(monthRecords[d.day - 1].total) === minMax?.min
                    ? 'min'
                    : Number(monthRecords[d.day - 1].total) === minMax?.max
                    ? 'max'
                    : ''
                }
              >
                {monthRecords &&
                  monthRecords[d.day - 1] &&
                  formatSecondsToTime(Number(monthRecords[d.day - 1].total))}
              </DateRecord>
            )}
          </DayContainer>,
        );
      });
      rows.push(
        <WeekContainer className="row" key={index}>
          {days}
        </WeekContainer>,
      );
      days = [];
    });

    return <div>{rows}</div>;
  };

  const formateDateObject = (date: any) => {
    const clonedObject = { ...date.toObject() };

    const formatedObject = {
      day: clonedObject.date,
      month: clonedObject.months,
      year: clonedObject.years,
      isCurrentMonth: clonedObject.months === currentMonth.month(),
      isCurrentDay: date.isToday(),
      isFuture: date.isAfter(),
    };

    return formatedObject;
  };

  return (
    <CanlendarContainer>
      {renderDays()}
      {renderCells()}
    </CanlendarContainer>
  );
};

export default Calendar;

const CanlendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const WeekContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const DayContainer = styled.div`
  flex-direction: column;
  font-size: 0.875rem;
  display: flex;
  justify-content: flex-start;
  text-align: center;
  margin-bottom: 28px;
  color: ${({ theme }) => theme.colors.grey[900]};

  &.hidden {
    opacity: 0;
  }

  &.disabled {
    margin-bottom: 50px;
    color: #bababa;
  }

  &.today {
    color: ${({ theme }) => theme.colors.primary[800]};
  }
`;

const DateNumber = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    width: 28px;
    height: 28px;
    position: absolute;
    border-radius: 100px;
    z-index: -1;
  }

  & > div.min {
    background-color: ${({ theme }) => theme.colors.bg.orange};
  }

  & > div.max {
    background-color: ${({ theme }) => theme.colors.bg.mint10};
  }
`;

const WeekDay = styled(DayContainer)`
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.grey[700]};
`;

const DateRecord = styled.div`
  color: ${({ theme }) => theme.colors.primary[800]};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  word-break: keep-all;
  font-size: 0.625rem;
  line-height: 0.9rem;

  &.min {
    color: ${({ theme }) => theme.colors.icon.orange50};
  }
`;
