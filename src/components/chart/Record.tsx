import { formatSeconds } from '@/utils';
import styled from 'styled-components';
import { BestRecordIcon, WorstRecordIcon } from '@/assets/icon/chartPage/index';

interface RecordProps {
  period: string;
  min: number;
  max: number;
}

export default function Record({ period, min, max }: RecordProps) {
  return (
    <RecordWrapper>
      <RecordContainer className={'best'}>
        <RecordTitle>
          <IconBase className={'best'}>
            <BestRecordIcon />
          </IconBase>
          {period} 최고기록
        </RecordTitle>

        <span>{formatSeconds(max)}</span>
      </RecordContainer>
      <RecordContainer className={'worst'}>
        <RecordTitle>
          <IconBase className={'worst'}>
            <WorstRecordIcon />
          </IconBase>
          {period} 최저 기록
        </RecordTitle>
        <span>{formatSeconds(min)}</span>
      </RecordContainer>
    </RecordWrapper>
  );
}

const RecordWrapper = styled.div`
  margin-top: 44px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const RecordContainer = styled.div`
  border-radius: 16px;
  ${({ theme }) => theme.fonts.spoqa.medium};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 20px;

  span {
    color: ${({ theme }) => theme.colors.grey[800]};
    font-size: 1.5rem;
  }

  &.best {
    background-color: ${({ theme }) => theme.colors.bg.mint10};
    color: ${({ theme }) => theme.colors.primary[900]};
  }

  &.worst {
    background-color: ${({ theme }) => theme.colors.bg.orange};
    color: ${({ theme }) => theme.colors.icon.orange50};
  }
`;

const RecordTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconBase = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  &.best {
    background-color: ${({ theme }) => theme.colors.icon.mint10};
  }

  &.worst {
    background-color: ${({ theme }) => theme.colors.icon.orange10};
  }
`;
