import { setInputClear } from "@/util/input";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import instance from "../../axios";
import { ISignInInfo } from "../../page/login/SignIn";
import { Input, SignInStepButton, Title } from "../../style/globalStyle";
import { DeleteBtn } from "../../style/icon/agreeStep";
import theme from "../../style/lightTheme";

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
  const [checkMessage, setCheckMessage] = useState<any>("");
  const [nickname, setNickname] = useState<string>("");
  const [nicknameValid, setNicknameValid] = useState<boolean>(true);
  const [submitValid, setSubmitValid] = useState<boolean>(false);
  const inputFocus = useRef<HTMLInputElement>(null);

  const nickNameHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { value } = event.target;
    setCheckMessage("");
    if (value.length >= 1) {
      setSubmitValid(true);
      setNicknameValid(true);
    } else if (value.length === 0) setSubmitValid(false);
    setState(value);
  };

  useEffect(() => {
    setSignInInfo((prev) => {
      return {
        ...prev,
        nickname,
      };
    });
  }, [nickname]);

  const setNewprofile = async () => {
    if (await checkNickname()) {
      setCurrenStep("complete");
      instance.put("api/user/nickname", { nickname: signInInfo.nickname });
      instance.put("api/user/ad-check", { adCheck: signInInfo.adCheck });
    } else {
      console.log("false");
      setNicknameValid(false);
    }
    inputFocus.current && inputFocus.current.focus();
  };

  const checkNickname = async () => {
    const response = await instance.get(
      `api/user/checknickname?nickname=${signInInfo.nickname}`
    );
    if (response.status === 200) return true;
    else {
      setCheckMessage(response.data.message);
      return false;
    }
  };

  return (
    <NicknameContainer>
      <Title>
        사용하실 닉네임을 <br />
        입력해주세요.
      </Title>
      <div style={{ position: "relative" }}>
        <div>
          <Input
            name="nickname"
            type="text"
            maxLength={8}
            ref={inputFocus}
            value={nickname}
            autoFocus
            placeholder="8자 이내 한글이나 영어로 입력해주세요."
            onChange={(e) => nickNameHandler(e, setNickname)}
            className={nicknameValid ? "" : "error"}
          />
          <IconContainer
            onClick={() =>
              setInputClear(setNickname, setSubmitValid, inputFocus)
            }
          >
            <DeleteBtn />
          </IconContainer>
        </div>
      </div>

      <NicknameErrorMsg>{checkMessage}</NicknameErrorMsg>

      <SignInStepButton
        type="submit"
        onClick={setNewprofile}
        disabled={!(submitValid && nicknameValid)}
      >
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

const NicknameErrorMsg = styled.div`
  margin-top: 12px;
  color: ${theme.colors.orange[900]};
`;

export const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  right: 0;
  cursor: pointer;
`;
