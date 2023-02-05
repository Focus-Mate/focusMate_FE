import { useEffect, useState } from "react";
import AgreeStep from "../../component/signIn/AgreeStep";
import Nickname from "../../component/signIn/Nickname";

const SignIn = () => {
  const [currentStep, setCurrenStep] = useState<string>("agree");
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

  if (currentStep === "agree")
    return (
      <AgreeStep
        agreeList={agreeList}
        checkAll={checkAll}
        nextStep={nextStep}
        checkboxHandler={checkboxHandler}
        setCurrenStep={setCurrenStep}
      />
    );
  else if (currentStep === "nickname")
    return <Nickname setCurrenStep={setCurrenStep} />;
  else return <>asdasd</>;
};
export default SignIn;
