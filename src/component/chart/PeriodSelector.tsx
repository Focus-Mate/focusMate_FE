import styled from "styled-components";
import { LeftArrowIcon, RightArrowIcon } from "../../style/icon/chartPage";
import { useEffect, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { getTodayDate } from "../../util";
import ko from "date-fns/locale/ko";
import format from "date-fns/format";
import { add, sub } from "date-fns";

const PeriodSelector = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [isToday, setIsToday] = useState(true);

  useEffect(() => {
    todayCheck();
    dailyChartRequest();
  }, [startDate]);

  const dateAdd = () => {
    const result = add(startDate, { days: 1 });
    setStartDate(result);
  };

  const dateSub = () => {
    const result = sub(startDate, { days: 1 });
    setStartDate(result);
  };

  const todayCheck = () => {
    const today = getTodayDate();
    const selectedDate = format(startDate, "MM/dd");
    if (today === selectedDate) {
      setIsToday(true);
    } else {
      setIsToday(false);
    }
  };

  const dailyChartRequest = () => {
    const day = startDate.toISOString();
    const requestDay = day.substring(0, day.length - 14);
    console.log(requestDay);
  };

  return (
    <PeriodSelectWrapper>
      <PeriodSelectBtn onClick={dateSub}>
        <LeftArrowIcon />
      </PeriodSelectBtn>

      <PeriodPicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        dateFormat="MM/dd (eee)"
        locale={ko}
        showPopperArrow={false}
      />

      <PeriodSelectBtn
        onClick={dateAdd}
        className={isToday ? "isToday" : ""}
        disabled={isToday ? true : false}
      >
        <RightArrowIcon />
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
    :hover {
      background-color: #f6f6f6;
    }
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

const PeriodPicker = styled(ReactDatePicker)`
  border: 0px solid transparent;
  text-align: center;
  cursor: pointer;
  caret-color: transparent;
  ::placeholder {
    color: red;
  }
  :focus {
    outline: none;
  }
`;
