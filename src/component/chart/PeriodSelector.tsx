import styled from "styled-components";
import { LeftArrowIcon, RightArrowIcon } from "../../style/icon/chartPage";
import { getToday, getTodayDate } from "../../util";
const PeriodSelector = () => {
  const 날짜 = getTodayDate();
  const 요일 = getToday();

  return (
    <PeriodSelectWrapper>
      <PeriodSelectBtn>
        <LeftArrowIcon />
      </PeriodSelectBtn>
      {날짜} ({요일})
      <PeriodSelectBtn>
        <RightArrowIcon />
      </PeriodSelectBtn>
    </PeriodSelectWrapper>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
