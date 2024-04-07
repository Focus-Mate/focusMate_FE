import { agreementList } from '@/component/signIn/AgreeStep';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ServiceTerms from '@/component/signIn/ServiceTerms';
import PrivacyTerms from '@/component/signIn/PrivacyTerms';
import { ReactComponent as BackArrow } from '@/style/icon/backArrow.svg';

export enum AgreementEnum {
  SERVICE = 'SERVICE',
  PRIVACY = 'PRIVACY',
  MARKETING = 'MARKETING',
}

export default function AgreementsDetail() {
  const [step, setStep] = useState<string>();
  const navigate = useNavigate();

  const { title } = useParams();

  const checkStepByTitle = (title: string) => {
    for (const steps in agreementList) {
      if (agreementList[steps].title === title) {
        setStep(agreementList[steps].agreement);
      }
    }
  };
  useEffect(() => {
    if (!title) {
      return;
    }
    checkStepByTitle(title);
  }, [title]);

  console.log(step);
  return (
    <DetailContainer>
      <Title>
        <TitleContainer>
          <IconContainer onClick={() => navigate(-1)}>
            <BackArrow />
          </IconContainer>
          {step}
        </TitleContainer>
      </Title>
      <Details>
        {title === AgreementEnum.SERVICE && <ServiceTerms />}
        {title === AgreementEnum.PRIVACY && <PrivacyTerms />}
      </Details>
    </DetailContainer>
  );
}

const DetailContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
`;

const Title = styled.div`
  ${({ theme }) => theme.fonts.spoqa.medium};
  width: 100%;
  height: 84px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 12px;
  background-color: #fff;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  width: 48px;
  height: 48px;
  fill: ${({ theme }) => theme.colors.grey[500]};
`;

const Details = styled.div`
  padding: 28px 20px;
  line-height: 1.25rem;
  font-size: 0.875rem;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
`;
