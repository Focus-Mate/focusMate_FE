import React from "react";
import instance from "../../axios";
import { ISignInInfo } from "../../page/login/SignIn";
import { Input, SignInStepButton, Title } from "../../style/globalStyle";

interface INicknameProps {
  setCurrenStep: React.Dispatch<React.SetStateAction<string>>;
  setSignInInfo: React.Dispatch<React.SetStateAction<object>>;
  signInInfo: ISignInInfo;
}
const Nickname = ({
  setCurrenStep,
  setSignInInfo,
  signInInfo,
}: INicknameProps) => {
  const nickNameHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<object>>
  ) => {
    const { value, name } = event.target;
    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const setNewprofile = () => {
    setCurrenStep("complete");
    instance.put("api/user/nickname", { nickname: signInInfo.nickname });
    instance.put("api/user/ad-check", { adCheck: signInInfo.adCheck });
  };

  return (
    <div>
      <Title>사용하실 닉네임을 입력해주세요</Title>
      <form>
        <Input
          name="nickname"
          type="text"
          maxLength={8}
          autoFocus
          placeholder="8자 이내 한글이나 영어로 입력해주세요."
          onChange={(e) => nickNameHandler(e, setSignInInfo)}
        />
      </form>
      <SignInStepButton type="submit" onClick={setNewprofile}>
        확인
      </SignInStepButton>
    </div>
  );
};

export default Nickname;
