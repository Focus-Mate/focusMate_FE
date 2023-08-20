import { Button } from '@/style/globalStyle';
import { formatSeconds } from '@/util';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RightArrowIcon, StudyHistoryIcon } from '../../style/icon/chartPage';
import { StudySession } from './DayChart';

interface StudyHistoryProps {
  dayRecord?: StudySession;
  needStudy?: boolean;
}

const StudyHistory = ({ dayRecord, needStudy }: StudyHistoryProps) => {
  const navigate = useNavigate();
  console.log(dayRecord, needStudy);
  return (
    <HistoryContainer>
      <IconWrapper needStudy={needStudy}>
        <StudyHistoryIcon fill={!needStudy ? '#359D9E' : '#fff'} />
      </IconWrapper>
      <HistoryWrapper needStudy={needStudy}>
        <StudyTime>
          {!needStudy && dayRecord
            ? formatSeconds(dayRecord.studyTime)
            : '00:00:00'}
        </StudyTime>
        <StartToEnd>
          {!needStudy && dayRecord ? (
            `${dayRecord.startTime} ~ ${dayRecord.endTime}`
          ) : (
            <NeedStudy>
              앗, 오늘은 아직 공부 기록이 없어요.
              <NeedStudyBtn onClick={() => navigate('/timer')}>
                바로 공부하러 가기
                <RightArrowIcon fill={'#fff'} />
              </NeedStudyBtn>
            </NeedStudy>
          )}
        </StartToEnd>
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

interface IconWrapperProps {
  needStudy?: boolean;
}

const IconWrapper = styled.div<IconWrapperProps>`
  background-color: ${props => (props.needStudy ? '#bababa' : '#e9faf7')};
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HistoryWrapper = styled.div<IconWrapperProps>`
  width: 100%;
  background-color: #f8fafa;
  border-left: ${props =>
    props.needStudy ? ' 4px solid #bababa;' : ' 4px solid #b3f0e8;'};
  border-radius: 0px 16px 16px 0px;
  padding: 20px;
`;

const StudyTime = styled.div`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.grey[800]};
`;

const StartToEnd = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.grey[600]};
`;

const NeedStudy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const NeedStudyBtn = styled(Button)`
  padding: 12px 16px;
  display: inline-block;
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
`;
