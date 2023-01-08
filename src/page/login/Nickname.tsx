import { Input } from "../../style/globalStyle";

const Nickname = () => {
  return (
    <>
      사용하실 닉네임을 입력해주세요
      <Input maxLength={8} autoFocus />
    </>
  );
};

export default Nickname;
