import { RefObject } from "react";

export const setInputClear = (
  setState: React.Dispatch<React.SetStateAction<string>>,
  setValid: React.Dispatch<React.SetStateAction<boolean>>,
  inputFocus: RefObject<HTMLInputElement>
) => {
  setState("");
  setValid(false);
  inputFocus.current && inputFocus.current.focus();
};
