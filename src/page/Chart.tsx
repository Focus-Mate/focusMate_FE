import styled from "styled-components";
import { ReactComponent as DDayIcon } from "../style/icon/chartPage/dday_icon.svg";
import { ReactComponent as ViewMoreIcon } from "../style/icon/viewmore_icon.svg";
function Chart() {
  return (
    <>
      <DDayWrapper>
        <Wrapper className="left">
          <IconWrapper>
            <DDayIcon />
          </IconWrapper>
          <DDayTitle>
            <h2> TOIEC 시험 </h2>
            <SubTitle>2022.10.20 (일)</SubTitle>
          </DDayTitle>
        </Wrapper>
        <Wrapper className="right">
          <DDay>D-35</DDay>
          <IconWrapper>
            <ViewMoreIcon />
          </IconWrapper>
        </Wrapper>
      </DDayWrapper>
      <div>캐릭터 div</div>
      <div>일, 주, 월 선택 탭</div>
      <div>기간 선택 div</div>
      <div>기간 내 공부시간 div</div>
      <div>
        공부기록 div
        <div>공부기록 1</div>
        <div>공부기록 2</div>
      </div>
    </>
  );
}

export default Chart;

const DDayWrapper = styled.div`
  background-color: #f6f6f6;
  width: 100%;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  gap: 12px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  &.left {
    gap: 12px;
  }

  &.right {
    gap: 16px;
    margin-right: 5px;
  }
`;

const IconWrapper = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  border-radius: 8px;
`;

const DDayTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const SubTitle = styled.span`
  color: #8c8c8c;
  font-size: 0.8rem;
`;

const DDay = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
`;
