import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/ko';
import weekdayPlugin from 'dayjs/plugin/weekday';
import objectPlugin from 'dayjs/plugin/toObject';
import isTodayPlugin from 'dayjs/plugin/isToday';
import styled from 'styled-components';
import { MinMax } from '@/component/chart/MonthChart';

interface CalendarProps {
  dateRecord: string[];
  minMaxDate: MinMax;
}

const Calendar = ({ dateRecord, minMaxDate }: CalendarProps) => {
  const now = dayjs().locale({
    ...locale,
  });

  dayjs.extend(weekdayPlugin);
  dayjs.extend(objectPlugin);
  dayjs.extend(isTodayPlugin);

  const [currentMonth, setCurrentMonth] = useState(now);
  const [arrayOfDays, setArrayOfDays] = useState<any>([]);

  const nextMonth = () => {
    const plus = currentMonth.add(1, 'month');

    setCurrentMonth(plus);
  };

  const prevMonth = () => {
    const minus = currentMonth.subtract(1, 'month');

    setCurrentMonth(minus);
  };

  const renderHeader = () => {
    const dateFormat = 'YYYY MMMM';

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={() => prevMonth()}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{currentMonth.format(dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={() => nextMonth()}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  };

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
    console.log(minMaxDate);
    getAllDays();
  }, [currentMonth]);

  const renderCells = () => {
    const rows: any = [];
    let days: any = [];

    arrayOfDays.forEach((week: any, index: number) => {
      week.dates.forEach((d: any, i: number) => {
        console.log(d.isFuture);
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
              <div
                className={
                  minMaxDate.minDate.includes(d.day)
                    ? 'min'
                    : minMaxDate.maxDate.includes(d.day)
                    ? 'max'
                    : ''
                }
              />
              {d.day}
            </DateNumber>
            <DateRecord>{d.isCurrentMonth && dateRecord[d.day - 1]}</DateRecord>
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
      {renderHeader()}
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
  justify-content: center;
  text-align: center;
  margin-bottom: 28px;
  color: ${({ theme }) => theme.colors.grey[900]};

  &.hidden {
    opacity: 0;
  }

  &.disabled {
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

  font-size: 0.625rem;
`;
