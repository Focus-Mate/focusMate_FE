import { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../../axios";
import { Title } from "../../style/globalStyle";
import theme from "../../style/theme";

export default function Complete() {
  const navigate = useNavigate();

  let timer: null | ReturnType<typeof setTimeout> = null;
  timer = setTimeout(() => {
    navigate("/timer");
  }, 3000);

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const getNickname = async () => {
    const response = await instance.get("api/user/me");
    return response.data.snsId;
  };

  const { data: userInfo, isLoading: isUserInfoLoading } = useQuery(
    "userInfo",
    getNickname
  );

  if (isUserInfoLoading) return <>loading..</>;
  else
    return (
      <CompleteContainer>
        <CompelteTitle>
          {userInfo}님,
          <br />
          환영합니다!
        </CompelteTitle>

        <CharactorDiv></CharactorDiv>
      </CompleteContainer>
    );
}

const CompleteContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CompelteTitle = styled(Title)`
  text-align: center;
  color: ${theme.colors.primary[700]};
  padding-top: 0px;
`;

const CharactorDiv = styled.div`
  background-color: ${theme.colors.bg.mint10};
  border-radius: 50%;
  width: 80%;
  height: 80%;

  margin: 0px 50px;
  float: left;
  padding-bottom: 80%;
`;
