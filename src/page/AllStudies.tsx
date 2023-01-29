import styled from "styled-components";
import { ReactComponent as Write } from "../style/icon/allstudy/write.svg";
import { ReactComponent as RingIcon } from "../style/icon/allstudy/ring.svg";
import { ReactComponent as Search } from "../style/icon/allstudy/search.svg";

function AllStudies() {
  return (
    <Wrap>
      {/* 메뉴바 */}
      <FixBar>
        <h1>모든스터디</h1>
        <div>
          <WriteIcon />
          <RingIcon />
        </div>
      </FixBar>
      {/* 검색바 */}
      <Container>
        <SearchBar>
          <SearchIcon />
          <SearchInput type="text" placeholder="스터디명 검색하기" />
        </SearchBar>
        {/* 스터디,캠스터디 탭 */}
        <Tab>
          <p>스터디</p>
          <p>캠스터디</p>
        </Tab>
        {/* 목록 */}
        <Contents>
          <h1>자격증 합격 스터디</h1>
          <div>
            <p>6/8명</p>
          </div>
          <div>
            <p>거북이</p>
          </div>
          <RoonInfo>
            <p>자격증 공부와 기타 취준을 위한 스터디 입니다. 이 ... </p>
          </RoonInfo>
        </Contents>
      </Container>
    </Wrap>
  );
}

export default AllStudies;

const Wrap = styled.div`
  margin: 20px;
`;

const FixBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 20px 10px 20px;
  /* background-color: ${({ theme }) => theme.colors.neutral[0]}; */
`;

const Container = styled.div`
  padding-top: 50px;
`;

const SearchBar = styled.div`
  position: relative;
  margin-bottom: 35px;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  top: 12px;
  left: 12px;
`;
const SearchInput = styled.input`
  /* background-color: ${({ theme }) => theme.colors.neutral[100]}; */
  width: 100%;
  height: 40px;
  border-radius: 100px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  box-sizing: border-box;
  padding-left: 40px;
`;

const WriteIcon = styled(Write)`
  margin-right: 16px;
`;

const Tab = styled.div``;
const Contents = styled.div`
  //width: 100%;
  height: 186px;
  padding: 16px;
  border-radius: 16px;
  background-color: #f8fafa;
`;

const RoonInfo = styled.div`
  border-radius: 16px;
  /* background-color: ${({ theme }) => theme.colors.neutral[0]}; */
`;
