import styled from 'styled-components';
import { LeftArrowIcon, RightArrowIcon } from '../../style/icon/chartPage';
import { useEffect, useState } from 'react';
import {
  getMondayAndSundayDates,
  getToday,
  getTodayDate,
  setDateFormat,
} from '../../util';
import format from 'date-fns/format';
import { add, setDate, sub } from 'date-fns';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ChartDateState } from '@/store/ChartDateState';
import { CurrentDateState } from '@/store/CurrentDateState';

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
  const [currentDate, setCurrentDate] = useRecoilState(CurrentDateState);

  useEffect(() => {
    return () => {
      setCurrentDate({ currentDate: new Date() });
    };
  }, []);

  useEffect(() => {
    if (period === 'week' && startDate.getDay() === 0) {
      startDate.setDate(startDate.getDate() - 1);
    }
  }, [startDate]);

  useEffect(() => {
    todayCheck();
    if (period === 'day') {
      dailyChartRequest();
    } else if (period === 'week') {
      weeklyChartRequest();
      // setStartDate(monday);
    } else if (period === 'month') {
      monthChartRequest();
    }
  }, [startDate, currentDate]);

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
      case 'month':
        const monthResult = add(currentDate.currentDate, { months: 1 });
        setCurrentDate({ currentDate: monthResult });
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
        const weekResult = sub(startDate, { weeks: 1 });
        setStartDate(weekResult);
        break;
      case 'month':
        const monthResult = sub(currentDate.currentDate, { months: 1 });
        setCurrentDate({ currentDate: monthResult });
        break;
    }
  };

  const todayCheck = () => {
    const todayDate = new Date();
    const todayString = String(todayDate);

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
        const sudayString = String(sunday);
        const sudayStringOnlyDate = sudayString.substring(
          0,
          sudayString.length - 27,
        );
        const todayStringOnlyDate = todayString.substring(
          0,
          todayString.length - 27,
        );
        if (sudayStringOnlyDate === todayStringOnlyDate) {
          setIsToday(true);
        } else setIsToday(false);
        break;
      case 'month':
        const todayYear = todayDate.getFullYear();
        const todayMonth = todayDate.getMonth() + 1;
        const currentYear = currentDate.currentDate.getFullYear();
        const currentMonth = currentDate.currentDate.getMonth() + 1;
        if (todayYear === currentYear && todayMonth === currentMonth) {
          return setIsToday(true);
        } else return setIsToday(false);
    }
  };

  const dailyChartRequest = () => {
    const day = startDate.toISOString();
    return setRequestDay({ theDay: day.substring(0, day.length - 14) });
  };

  const monthChartRequest = () => {
    const today = new Date();
    const year = currentDate.currentDate.getFullYear();
    const month = currentDate.currentDate.getMonth() + 1;

    if (today.getMonth() === currentDate.currentDate.getMonth()) {
      const thisMonth = today.toISOString();
      const lastDay = thisMonth.substring(0, thisMonth.length - 14);
      return setRequestDay({
        firstDay: `${year}-${setDateFormat(month)}-01`,
        lastDay,
      });
    } else {
      const lastDate = new Date(
        currentDate.currentDate.getFullYear(),
        currentDate.currentDate.getMonth() + 1,
        1,
      ).toISOString();

      return setRequestDay({
        firstDay: `${year}-${setDateFormat(month)}-01`,
        lastDay: lastDate.substring(0, lastDate.length - 14),
      });
    }
  };

  const weeklyChartRequest = () => {
    // const todayDate = new Date();
    // if (todayDate.getDay() === 0) {
    //   const pastWeek = new Date(todayDate.setDate(todayDate.getDate() - 1));
    //   const { monday, sunday } = getMondayAndSundayDates(pastWeek);
    //   const pastMondayString = monday.toISOString();
    //   const pastSundayString = sunday.toISOString();
    //   return setRequestDay({
    //     firstDay: pastMondayString.substring(0, pastMondayString.length - 14),
    //     lastDay: pastSundayString.substring(0, pastSundayString.length - 14),
    //   });
    // } else {
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
        : period === 'week'
        ? `${format(monday, 'MM/dd')}(${getToday(monday)}) ~ ${format(
            sunday,
            'MM/dd',
          )}(${getToday(sunday)})`
        : `${currentDate.currentDate.getFullYear()}년 ${
            currentDate.currentDate.getMonth() + 1
          }월`}

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
