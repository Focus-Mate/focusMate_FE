import styled from "styled-components";
import { StudyHistoryIcon } from "../../style/icon/chartPage";

const StudyHistory = () => {
  return (
    <HistoryContainer>
      <IconWrapper>
        <StudyHistoryIcon />
      </IconWrapper>
      <HistoryWrapper>
        <p>00:30:30</p>오전 5:18 ~ 오전 6:23
      </HistoryWrapper>
    </HistoryContainer>
  );
};

export default StudyHistory;

const HistoryContainer = styled.div`
  display: grid;
  grid-template-columns: 40px 9fr;
  gap: 16px;
  margin-bottom: 16px;
`;

const IconWrapper = styled.div`
  background-color: #e9faf7;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HistoryWrapper = styled.div`
  width: 100%;
  background-color: #f8fafa;
  border-left: 4px solid #b3f0e8;
  border-radius: 0px 16px 16px 0px;
  padding: 20px;
`;
