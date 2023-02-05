import React from "react";
import styled from "styled-components";
import { Button, SignInStepButton, Title } from "../../style/globalStyle";

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
  return (
    <>
      <Title>간편한 이용을 위해 약관에 동의해주세요</Title>
      <p>
        <input type="checkbox" value="SERVICE" onClick={checkAll} />
        <label>전체 동의</label>
      </p>
      <hr />
      <form>
        <p>
          <input
            type="checkbox"
            value="SERVICE"
            onClick={checkboxHandler}
            checked={agreeList.includes("SERVICE") ? true : false}
          />
          <label>서비스 이용약관 (필수)</label>
        </p>
        <p>
          <input
            type="checkbox"
            value="PRIVACY"
            onClick={checkboxHandler}
            checked={agreeList.includes("PRIVACY") ? true : false}
          />
          <label>개인정보 처리방침 (필수)</label>
        </p>
        <p>
          <input
            type="checkbox"
            value="MARKETING"
            onClick={checkboxHandler}
            checked={agreeList.includes("MARKETING") ? true : false}
          />
          <label>E-mail 및 마케팅 정보 수신동의 (선택)</label>
        </p>
      </form>
      <SignInStepButton
        onClick={() => setCurrenStep("nickname")}
        type="submit"
        disabled={!nextStep}
      >
        다음
      </SignInStepButton>
    </>
  );
}
