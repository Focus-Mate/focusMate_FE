import React from 'react';
import styled from 'styled-components';
import { Button, Title } from '../../style/globalStyle';
import { CheckBoxDefault, CheckBoxChecked } from '../../style/icon/agreeStep';
interface IAgreeStepProps {
  checkAll: (e: any) => void;
  checkboxHandler: (e: any) => void;
  setCurrenStep: React.Dispatch<React.SetStateAction<string>>;
  agreeList: string[];
  nextStep: boolean;
}

export default function AgreeStep({
  checkAll,
  checkboxHandler,
  setCurrenStep,
  agreeList,
  nextStep,
}: IAgreeStepProps) {
  const agreementList = [
    { agreement: 'SERVICE', description: '서비스 이용약관 (필수)' },
    { agreement: 'PRIVACY', description: '개인정보 처리방침(필수)' },
    {
      agreement: 'MARKETING',
      description: 'E-mail 및 마케팅 정보 수신동의 (선택)',
    },
  ];
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

      <hr />
      <form>
        {agreementList.map((agree, idx) => {
          return (
            <SingleAgreement key={idx}>
              <AgreementInput
                type="checkbox"
                value={agree.agreement}
                onClick={checkboxHandler}
                defaultChecked={
                  agreeList.includes(`${agree.agreement}`) ? true : false
                }
              />
              <AgreementCheckBox>
                {agreeList.includes(`${agree.agreement}`) ? (
                  <CheckBoxChecked />
                ) : (
                  <CheckBoxDefault />
                )}
              </AgreementCheckBox>
              {agree.description}
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
