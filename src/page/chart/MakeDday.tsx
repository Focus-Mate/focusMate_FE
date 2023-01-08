import styled from "styled-components";
import { Input } from "../../style/globalStyle";

const MakeDday = () => {
  return (
    <>
      <Header>D-DAY 제목과 날짜를 입력해주세요</Header>
      <Input maxLength={10} autoFocus />
    </>
  );
};
export default MakeDday;

const Header = styled.h1`
  word-break: keep-all;
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 40px;
`;
