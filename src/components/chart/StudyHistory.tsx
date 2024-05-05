import { Button } from '@/styles/globalStyle';
import { formatSeconds } from '@/utils';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RightArrowIcon, StudyHistoryIcon } from '../../assets/icon/chartPage';
import { StudySession } from './DayChart';
import { IconWrapper } from '@/pages/chart/Chart';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { CurrentDateState } from '@/store/CurrentDateState';
import { IsTodayState } from '@/store/IsTodayState';

interface StudyHistoryProps {
  dayRecord?: StudySession;
}

const StudyHistory = ({ dayRecord }: StudyHistoryProps) => {
  const [needStudy, setNeedStudy] = useState<boolean>(true);
  const [isToday] = useRecoilState(IsTodayState);

  const navigate = useNavigate();

  useEffect(() => {
    if (dayRecord) setNeedStudy(false);
  }, [dayRecord]);

  return (
    <HistoryContainer>
      <StudyHistoryIconWrapper needStudy={needStudy}>
        <StudyHistoryIcon />
      </StudyHistoryIconWrapper>
      <HistoryWrapper needStudy={needStudy}>
        <StudyTime>
          {dayRecord ? formatSeconds(dayRecord.studyTime) : '00:00:00'}
        </StudyTime>
        <StartToEnd>
          {dayRecord ? (
            `${dayRecord.startTime} ~ ${dayRecord.endTime}`
          ) : (
            <NeedStudy>
              {isToday.isToday ? (
                <>이 날은 공부 기록이 없어요.</>
              ) : (
                <>
                  앗, 오늘은 아직 공부 기록이 없어요.
                  <NeedStudyBtn onClick={() => navigate('/timer')}>
                    바로 공부하러 가기
                    <IconWrapper className="base" size={14}>
                      <RightArrowIcon />
                    </IconWrapper>
                  </NeedStudyBtn>
                </>
              )}
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

const StudyHistoryIconWrapper = styled.div<IconWrapperProps>`
  background-color: ${({ needStudy, theme }) =>
    needStudy ? theme.colors.grey[400] : theme.colors.bg.mint10};
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    fill: ${({ needStudy, theme }) =>
      !needStudy
        ? `${theme.colors.primary[900]}`
        : `${theme.colors.icon.white}`};
  }
`;

const HistoryWrapper = styled.div<IconWrapperProps>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bg.grey};
  border-left: ${({ needStudy, theme }) =>
    needStudy
      ? `4px solid ${theme.colors.grey[400]}`
      : `4px solid ${theme.colors.bg.mint20}`};
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
  font-size: 0.875rem;
  line-height: 1.2rem;
`;

const NeedStudyBtn = styled(Button)`
  padding: 12px 16px;
  display: inline-block;
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
`;
