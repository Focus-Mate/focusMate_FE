import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as TimerIcon } from "./style/icon/GNB/timer_icon.svg";
import { ReactComponent as ChartIcon } from "./style/icon/GNB/chart_icon.svg";
import { ReactComponent as AllStudyIcon } from "./style/icon/GNB/all studies_icon.svg";
import { ReactComponent as MyStudyIcon } from "./style/icon/GNB/my study_icon.svg";
import { ReactComponent as MoreIcon } from "./style/icon/GNB/more_icon.svg";

function Navigation() {
  return (
    <GNB>
      <GNBIcon>
        <Link to={"timer"}> 타이머 </Link>
      </GNBIcon>
      <GNBIcon>
        <Link to={"chart"}>통계</Link>
      </GNBIcon>
      <GNBIcon>
        <Link to={"allstudies"}>스터디 찾기</Link>
      </GNBIcon>
      <GNBIcon>
        <Link to={"mystudy"}>내 스터디</Link>
      </GNBIcon>
      <GNBIcon>
        <Link to={"more"}>설정</Link>
      </GNBIcon>
    </GNB>
  );
}

export default Navigation;

const GNB = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 75px;
  border: 1px solid #eaebeb;
  border-bottom: 0px;
  border-radius: 24px 24px 0px 0px;
  bottom: 0;
  position: absolute;
  width: 100vw;
`;

const GNBIcon = styled.div`
  width: 48px;
  height: 48px;
`;
