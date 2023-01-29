import { useEffect, useState } from "react";
import Nickname from "./Nickname";

const SignIn = () => {
  const [agreeList, setAgreeList] = useState<Array<string | any>>([]);
  const [nextStep, setNextStep] = useState<boolean>(false);

  const checkboxHandler = (e: any) => {
    if (e.target.checked && !agreeList.includes(e.target.value)) {
      setAgreeList((prev: string | any) => [...prev, e.target.value]);
    } else if (!e.target.checked) {
      const newList = agreeList.filter((value) => value !== e.target.value);
      setAgreeList(newList);
    }
  };

  const checkAll = (e: any) => {
    if (e.target.checked) setAgreeList(["SERVICE", "PRIVACY", "MARKETING"]);
    else setAgreeList([]);
  };

  const nextStepCheck = () => {
    if (agreeList.includes("PRIVACY") && agreeList.includes("SERVICE")) {
      setNextStep(true);
    } else {
      setNextStep(false);
    }
  };

  useEffect(() => {
    nextStepCheck();
    console.log(agreeList);
  }, [agreeList]);

  return (
    <>
      <h1>간편한 이용을 위해 약관에 동의해주세요</h1>
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
        <input type="submit" value="다음" disabled={!nextStep} />
      </form>
      <Nickname />
    </>
  );
};
export default SignIn;
