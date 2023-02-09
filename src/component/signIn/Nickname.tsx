import React, { useState } from "react";
import styled from "styled-components";
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
  const [, setCheckMessage] = useState<string>("");

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

  const setNewprofile = async () => {
    if (await checkNickname()) {
      setCurrenStep("complete");
      instance.put("api/user/nickname", { nickname: signInInfo.nickname });
      instance.put("api/user/ad-check", { adCheck: signInInfo.adCheck });
    } else {
    }
  };

  const checkNickname = async () => {
    const response = await instance.get(
      `api/user/checknickname?nickname=${signInInfo.nickname}`
    );
    setCheckMessage(response.data.message);
    return response.status;
  };

  return (
    <NicknameContainer>
      <Title>
        사용하실 닉네임을 <br />
        입력해주세요.
      </Title>
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
      <SignInStepButton type="submit" onClick={checkNickname}>
        확인
      </SignInStepButton>
    </NicknameContainer>
  );
};

export default Nickname;

const NicknameContainer = styled.div`
  position: relative;
  min-height: 100vh;
`;
