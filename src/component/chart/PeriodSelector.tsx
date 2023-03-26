import styled from "styled-components";
import { LeftArrowIcon, RightArrowIcon } from "../../style/icon/chartPage";
import { useEffect, useState } from "react";
import { getToday, getTodayDate } from "../../util";
import format from "date-fns/format";
import { add, sub } from "date-fns";
import { useSetRecoilState } from "recoil";
import { ChartDateState } from "@/store/ChartDateState";

const PeriodSelector = () => {
  // note: startdate = Date 객체 원본
  const [startDate, setStartDate] = useState(new Date());
  const [isToday, setIsToday] = useState(true);
  const setRequestDay = useSetRecoilState(ChartDateState);

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
    } else if (today !== selectedDate) {
      setIsToday(false);
    }
  };

  const dailyChartRequest = () => {
    const day = startDate.toISOString();
    return setRequestDay(day.substring(0, day.length - 14));
  };

  return (
    <PeriodSelectWrapper>
      <PeriodSelectBtn onClick={dateSub}>
        <LeftArrowIcon />
      </PeriodSelectBtn>

      {`${format(startDate, "MM/dd")} (${getToday(startDate)})`}

      <PeriodSelectBtn
        onClick={dateAdd}
        className={isToday ? "isToday" : ""}
        disabled={isToday}
      >
        <RightArrowIcon fill={isToday ? "#ececec" : "#949494"} />
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
