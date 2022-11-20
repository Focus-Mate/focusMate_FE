import { Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      <div>
        <Link to={"chart"}> 타이머 </Link>
      </div>
      <div>
        <Link to={"chart"}>통계</Link>
      </div>
      <div>스터디 찾기</div>
      <div>내 스터디</div>
      <div>설정</div>
    </>
  );
}

export default Navigation;
