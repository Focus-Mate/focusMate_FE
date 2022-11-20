import { Link } from "react-router-dom";
import styled from "styled-components";

function Navigation() {
  return (
    <GNB>
      <div>
        <Link to={"timer"}> 타이머 </Link>
      </div>
      <div>
        <Link to={"chart"}>통계</Link>
      </div>
      <div>
        <Link to={"studies"}>스터디 찾기</Link>
      </div>
      <div>
        <Link to={"mystudy"}>내 스터디</Link>
      </div>
      <div>
        <Link to={"setting"}>설정</Link>
      </div>
    </GNB>
  );
}

export default Navigation;

const GNB = styled.div`
  display: flex;
  gap: 30px;
`;
