import styled from "styled-components";

const StudyTime = () => {
  return (
    <StudyTimeWrapper>
      하루 총 공부시간
      <p>
        <h1>06:22:04 </h1>
      </p>
    </StudyTimeWrapper>
  );
};

export default StudyTime;

const StudyTimeWrapper = styled.div`
  text-align: center;
  color: #555;
  p {
    margin-top: 5px;
    color: #111;
  }
  h1 {
    font-weight: 700;
    font-size: 36px;
  }
`;
