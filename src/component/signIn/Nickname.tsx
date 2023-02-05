import React from "react";
import { Input, SignInStepButton, Title } from "../../style/globalStyle";

interface INicknameProps {
  setCurrenStep: React.Dispatch<React.SetStateAction<string>>;
}
const Nickname = ({ setCurrenStep }: INicknameProps) => {
  return (
    <div>
      <Title>사용하실 닉네임을 입력해주세요</Title>
      <form>
        <Input
          maxLength={8}
          autoFocus
          placeholder="8자 이내 한글이나 영어로 입력해주세요."
        />
      </form>
      <SignInStepButton type="submit">확인</SignInStepButton>
    </div>
  );
};

export default Nickname;
