import styled from 'styled-components';
import { LeftArrowIcon, RightArrowIcon } from '../../style/icon/chartPage';
import { useEffect, useState } from 'react';
import { getMondayAndSundayDates, getToday, getTodayDate } from '../../util';
import format from 'date-fns/format';
import { add, sub } from 'date-fns';
import { useSetRecoilState } from 'recoil';
import { ChartDateState } from '@/store/ChartDateState';

type Period = 'day' | 'week' | 'month';

interface PeriodSelectorProps {
  period: Period;
}

const PeriodSelector = ({ period }: PeriodSelectorProps) => {
  // note: startdate = Date 객체 원본
  const [startDate, setStartDate] = useState(new Date());
  const [isToday, setIsToday] = useState(true);
  const setRequestDay = useSetRecoilState(ChartDateState);
  const { monday, sunday } = getMondayAndSundayDates(startDate);
  const [isSunday, setIsSunday] = useState<boolean>();

  useEffect(() => {
    todayCheck();
    if (period === 'day') {
      dailyChartRequest();
    } else if (period === 'week') {
      weeklyChartRequest();
      // setStartDate(monday);
    }
  }, [startDate]);

  useEffect(() => {
    if (startDate.getDay() === 0) {
      startDate.setDate(startDate.getDate() - 1);
    }
  }, [startDate]);

  const dateAdd = () => {
    switch (period) {
      case 'day':
        const dayResult = add(startDate, { days: 1 });
        setStartDate(dayResult);
        break;
      case 'week':
        const weekResult = add(startDate, { days: 7 });
        setStartDate(weekResult);
        break;
    }
  };

  const dateSub = () => {
    switch (period) {
      case 'day':
        const dayResult = sub(startDate, { days: 1 });
        setStartDate(dayResult);
        break;
      case 'week':
        const weekResult = sub(startDate, { days: 7 });
        setStartDate(weekResult);
        break;
    }
  };

  const todayCheck = () => {
    switch (period) {
      case 'day':
        const today = getTodayDate();
        const selectedDate = format(startDate, 'MM/dd');
        if (today === selectedDate) {
          setIsToday(true);
        } else if (today !== selectedDate) {
          setIsToday(false);
        }
        break;
      case 'week':
        const todayDate = new Date();
        const thisMonday = format(
          getMondayAndSundayDates(todayDate).monday,
          'MM/dd',
        );
        if (thisMonday === format(monday, 'MM/dd')) {
          setIsToday(true);
        } else if (thisMonday !== format(monday, 'MM/dd')) {
          setIsToday(false);
        }
        break;
    }
  };

  const dailyChartRequest = () => {
    const day = startDate.toISOString();
    return setRequestDay({ theDay: day.substring(0, day.length - 14) });
  };

  const weeklyChartRequest = () => {
    const todayDate = new Date();
    if (todayDate.getDay() === 0) {
      const pastWeek = new Date(todayDate.setDate(todayDate.getDate() - 1));
    }
    const mondayString = monday.toISOString();
    const sundayString = sunday.toISOString();

    return setRequestDay({
      firstDay: mondayString.substring(0, mondayString.length - 14),
      lastDay: sundayString.substring(0, sundayString.length - 14),
    });
  };

  return (
    <PeriodSelectWrapper>
      <PeriodSelectBtn onClick={dateSub}>
        <LeftArrowIcon />
      </PeriodSelectBtn>

      {period === 'day'
        ? `${format(startDate, 'MM/dd')} (${getToday(startDate)})`
        : `${format(monday, 'MM/dd')}(${getToday(monday)}) ~ ${format(
            sunday,
            'MM/dd',
          )}(${getToday(sunday)})`}

      <PeriodSelectBtn
        onClick={dateAdd}
        className={isToday ? 'isToday' : ''}
        disabled={isToday}
      >
        <RightArrowIcon fill={isToday ? '#ececec' : '#949494'} />
      </PeriodSelectBtn>
    </PeriodSelectWrapper>
  );
};

export default PeriodSelector;

const PeriodSelectBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #f6f6f6;
  border: 0px solid transparent;
  min-width: 36px;
  height: 36px;
  border-radius: 12px;
  :hover {
    background-color: #b3f0e8;
  }

  &.isToday {
    cursor: default;
    background-color: #e2e2e2;
  }
`;

const PeriodSelectWrapper = styled.div`
  margin: 15px 0px 49px 0px;
  color: #777;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .react-datepicker__input-container {
    display: flex;
    justify-content: center;
  }
  .react-datepicker {
  }
`;
