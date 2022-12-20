import styled from "styled-components";
import { LeftArrowIcon, RightArrowIcon } from "../../style/icon/chartPage";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const PeriodSelector = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <PeriodSelectWrapper>
        <PeriodSelectBtn>
          <LeftArrowIcon />
        </PeriodSelectBtn>

        <ReactDatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />

        <PeriodSelectBtn>
          <RightArrowIcon />
        </PeriodSelectBtn>
      </PeriodSelectWrapper>
    </>
  );
};

export default PeriodSelector;

const PeriodSelectBtn = styled.button`
  background-color: #f6f6f6;
  border: 0px solid transparent;
  width: 36px;
  height: 36px;
  border-radius: 12px;

  &.tomorrow {
  }
`;

const PeriodSelectWrapper = styled.div`
  margin: 15px 0px 49px 0px;
  color: #777;
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
`;
