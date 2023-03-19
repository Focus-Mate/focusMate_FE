import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Input, SignInStepButton, Title } from "../../style/globalStyle";
import { ReactComponent as BackArrow } from "../../style/icon/backArrow.svg";
import { DDayIcon } from "../../style/icon/chartPage";
import theme from "../../style/theme";
import { DatePicker, ConfigProvider } from "antd-mobile";
import koKR from "antd-mobile/es/locales/ko-KR";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { IconContainer } from "@/component/signIn/Nickname";
import { DeleteBtn } from "@/style/icon/agreeStep";
import { setInputClear } from "@/util/input";
import { getDate } from "@/util";
import instance from "@/axios";
import { useMutation } from "react-query";

export default function MakeDday() {
  const now = new Date();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [ddate, setDdate] = useState<string>(getDate(now));
  const [ddayTitle, setDdayTitle] = useState<string>("");
  const [submitValid, setSubmitValid] = useState<boolean>(false);

  const inputFocus = useRef<HTMLInputElement>(null);
  const { exam, dday } = useParams();
  const ddayHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { value } = event.target;
    if (value.length >= 1) {
      setSubmitValid(true);
    } else if (value.length === 0) setSubmitValid(false);
    setState(value);
  };

  useEffect(() => {
    if (exam && dday) {
      setDdayTitle(exam);
      setDdate(dday);
      setSubmitValid(true);
    }
  }, [exam, dday]);

  const labelRenderer = useCallback((type: string, data: number) => {
    switch (type) {
      case "year":
        return data + "년";
      case "month":
        return data + "월";
      case "day":
        return data + "일";
      default:
        return data;
    }
  }, []);

  const postDday = async () => {
    await instance.post(`/api/calculate/setDay`, {
      exam: ddayTitle,
      dday: ddate,
    });
  };

  const updateDday = async () => {
    await instance.put(`api/calculate/modifyDay?pexam=${exam}`, {
      exam: ddayTitle,
      dday: ddate,
    });
  };

  const { mutateAsync: postDdayMutate } = useMutation(postDday, {
    onSuccess: () => {
      navigate("/chart");
    },
  });
  const { mutateAsync: updateDdayMutate } = useMutation(updateDday, {
    onSuccess: () => {
      navigate("/chart");
    },
  });

  const setDday = async () => {
    if (exam && dday) {
      updateDdayMutate();
    } else {
      postDdayMutate();
    }
  };

  return (
    <DdayContainer>
      <BackArrowWrapper onClick={() => navigate(-1)}>
        <BackArrow />
      </BackArrowWrapper>

      <DdayTitle>
        D-DAY 제목과 날짜를
        <br />
        입력해주세요
      </DdayTitle>
      <InputContainer>
        <Input
          name="ddayTitle"
          type="text"
          placeholder="10자 이내 한글이나 영어로 입력해주세요."
          maxLength={10}
          autoFocus
          ref={inputFocus}
          value={ddayTitle}
          onChange={(e) => ddayHandler(e, setDdayTitle)}
        />
        <IconContainer
          onClick={() =>
            setInputClear(setDdayTitle, setSubmitValid, inputFocus)
          }
        >
          <DeleteBtn />
        </IconContainer>
      </InputContainer>

      <SelectWrapper>
        <DDaySelect
          onClick={() => {
            setVisible(true);
          }}
        >
          <DDayIcon fill={theme.colors.grey[600]} />
          {ddate}
          <IconContainer>
            <SelectArrow />
          </IconContainer>
        </DDaySelect>
      </SelectWrapper>

      <ConfigProvider locale={koKR}>
        <DatePicker
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          defaultValue={now}
          onConfirm={(val) => setDdate(getDate(val))}
          renderLabel={labelRenderer}
          precision="day"
        />
      </ConfigProvider>

      <SignInStepButton type="submit" disabled={!submitValid} onClick={setDday}>
        확인
      </SignInStepButton>
    </DdayContainer>
  );
}

const DdayContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const DdayTitle = styled(Title)`
  padding-top: 60px;
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
`;

const DDaySelect = styled.div`
  width: 100%;
  border-radius: 16px;
  border: 0px solid transparent;
  background-color: ${theme.colors.bg.grey};
  padding: 23px;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 12px;
`;
const SelectArrow = styled(BackArrow)`
  fill: ${theme.colors.grey[700]};
  transform: rotate(-90deg);
`;

const BackArrowWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 8px;
`;
