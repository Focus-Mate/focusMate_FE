import React from 'react';
import styled from 'styled-components';
import { Button, Title } from '../../style/globalStyle';
import {
  CheckBoxDefault,
  CheckBoxChecked,
  SeeAgreementsArrow,
} from '../../style/icon/agreeStep';
import { Link } from 'react-router-dom';
import { AgreementEnum } from '@/page/signIn/AgreementsDetail';
interface IAgreeStepProps {
  checkAll: (e: any) => void;
  checkboxHandler: (e: any) => void;
  setCurrenStep: React.Dispatch<React.SetStateAction<string>>;
  agreeList: string[];
  nextStep: boolean;
}

export const agreementList = [
  {
    title: AgreementEnum.SERVICE,
    agreement: '서비스 이용약관',
    option: '(필수)',
  },
  {
    title: AgreementEnum.PRIVACY,
    agreement: '개인정보 처리방침',
    option: '(필수)',
  },
  {
    title: AgreementEnum.MARKETING,
    agreement: 'E-mail 및 마케팅 정보 수신동의',
    option: '(선택)',
  },
];

export default function AgreeStep({
  checkAll,
  checkboxHandler,
  setCurrenStep,
  agreeList,
  nextStep,
}: IAgreeStepProps) {
  return (
    <AgreementContainer>
      <Title>
        간편한 이용을 위해 <br />
        약관에 동의해주세요.
      </Title>

      <SingleAgreement>
        <AgreementInput type="checkbox" onClick={checkAll} />
        <AgreementCheckBox>
          {agreeList.length === 3 ? <CheckBoxChecked /> : <CheckBoxDefault />}
        </AgreementCheckBox>
        <AgreeAllCheck>전체 동의</AgreeAllCheck>
      </SingleAgreement>

      <Divider />
      <form>
        {agreementList.map((agree, idx) => {
          return (
            <SingleAgreement key={idx}>
              <AgreementInput
                type="checkbox"
                value={agree.title}
                onClick={checkboxHandler}
                defaultChecked={
                  agreeList.includes(`${agree.title}`) ? true : false
                }
              />
              <AgreementCheckBox>
                {agreeList.includes(`${agree.title}`) ? (
                  <CheckBoxChecked />
                ) : (
                  <CheckBoxDefault />
                )}
              </AgreementCheckBox>
              {agree.agreement} {agree.option}
              <SeeMoreArrow to={agree.title}>
                <SeeAgreementsArrow />
              </SeeMoreArrow>
            </SingleAgreement>
          );
        })}
      </form>
      <SignInStepButton
        onClick={() => setCurrenStep('nickname')}
        type="submit"
        disabled={!nextStep}
      >
        다음
      </SignInStepButton>
    </AgreementContainer>
  );
}

const Divider = styled.hr`
  border: transparent;
  border-bottom: 1px solid #dcdcdc;
`;

const AgreementContainer = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 0 20px;
  box-sizing: border-box;
`;

const AgreeAllCheck = styled.span`
  font-family: spoqaMedium;
`;

const AgreementInput = styled.input`
  display: none;
`;

const SingleAgreement = styled.label`
  display: flex;
  align-items: center;
`;

const AgreementCheckBox = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -8px;
`;

export const SignInStepButton = styled(Button)`
  position: absolute;
  bottom: 16px;
  left: 50%;
  width: calc(100% - 20px);
  transform: translateX(-50%);
`;

export const SeeMoreArrow = styled(Link)`
  position: absolute;
  right: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
