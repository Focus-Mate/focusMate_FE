// Library
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Components
import MenuBox from '@/component/more/MenuBox';

// Icons
import iconNotice from '@/style/icon/more/notice.png';
import iconDelete from '@/style/icon/more/delete.png';
import iconFolder from '@/style/icon/more/folder.png';
import iconMoon from '@/style/icon/more/moon.png';
import iconOut from '@/style/icon/more/out.png';
import iconPc from '@/style/icon/more/pc.png';
import iconTerms from '@/style/icon/more/terms.png';
import { useQuery } from 'react-query';
import instance from '@/instance';
import { useRecoilState } from 'recoil';
import { isThemeDark } from '@/App';
import ConfirmPop from '@/component/common/pop/ConfirmPop';
import useNavigationComp from '@/component/Navigation.hooks';
import { AnimatePresence, motion } from 'framer-motion';
import useNavigatePush from '@/hooks/useNavigatePush';

function Setting() {
  const [darkMode, setDarkMode] = useRecoilState(isThemeDark);
  const [isLogoutPop, setLogoutPop] = useState(false);
  const navigate = useNavigate();
  const navigatePush = useNavigatePush();

  const { onExitComplete, getCompareSameTarget } = useNavigationComp();

  const { data: response } = useQuery(['GetUser'], async () => {
    const response = await instance.get('/api/user/me');

    return response;
  });

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {getCompareSameTarget('/more') && (
        <Wrapper
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.3,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.3,
            },
          }}
        >
          <ConfirmPop
            options={{
              message: '정말 로그아웃 하시나요?',
              onCancel: () => {
                setLogoutPop(false);
              },
              onConfirm: () => {
                localStorage.removeItem('token');
                navigate('/login');
                setLogoutPop(false);
              },
              onCancelText: '아니요',
              onConfirmText: '로그아웃하기',
              isOpen: isLogoutPop,
              setOpen: setLogoutPop,
            }}
          />
          <Container>
            <Header>
              <Title>설정</Title>
              <User>
                <PictureBox></PictureBox>
                <Nickname>{response?.data?.nickname}</Nickname>
                <ButtonArea onClick={() => navigate('/more/nick')}>
                  <Button>닉네임 수정</Button>
                </ButtonArea>
              </User>
              <MenuBox
                options={{
                  title: '이용 안내',
                }}
                items={[
                  <Item onClick={() => navigatePush('/more/notice')}>
                    <ItemIcon src={iconNotice} alt="notice" />
                    공지사항
                  </Item>,
                  <Item onClick={() => navigatePush('/more/service')}>
                    <ItemIcon src={iconTerms} alt="terms" />
                    서비스 이용약관
                  </Item>,
                  <Item onClick={() => navigatePush('/more/personal')}>
                    <ItemIcon src={iconTerms} alt="info" />
                    개인정보 처리방침
                  </Item>,
                ]}
              />
              <MenuBox
                options={{
                  title: '공지사항',
                }}
                items={[
                  <Item>
                    <ItemIcon src={iconMoon} alt="notice" />
                    <ItemText>다크모드 설정</ItemText>
                    <ItemContent>
                      <SwitchBox
                        onClick={async () => {
                          try {
                            const response = await instance.put(
                              '/api/user/onDark',
                              {
                                dark: !darkMode,
                              },
                            );

                            console.log(response);
                            setDarkMode(mode => !mode);
                          } catch (e) {}
                        }}
                        isDark={darkMode}
                      >
                        <SwitchCircle isDark={darkMode} />
                      </SwitchBox>
                    </ItemContent>
                  </Item>,
                  <Item>
                    <ItemIcon src={iconPc} alt="notice" />
                    <ItemText>버전 정보</ItemText>
                    <ItemContent style={{ marginRight: '5px' }}>
                      1.0.0
                    </ItemContent>
                  </Item>,
                  <Item onClick={() => navigatePush('/more/license')}>
                    <ItemIcon src={iconFolder} alt="notice" />
                    <ItemText>오픈소스 라이선스</ItemText>
                  </Item>,
                  <Item
                    onClick={() => {
                      setLogoutPop(true);
                    }}
                  >
                    <ItemIcon src={iconOut} alt="notice" />
                    로그아웃
                  </Item>,
                  <Item onClick={() => navigatePush('/more/remove')}>
                    <ItemIcon src={iconDelete} alt="notice" />
                    탈퇴하기
                  </Item>,
                ]}
              />
            </Header>
          </Container>
        </Wrapper>
      )}
    </AnimatePresence>
  );
}
export default Setting;

const Wrapper = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.bg.base};
  padding: 20px;
  color: ${({ theme }) => theme.colors.grey[800]};
`;

const Container = styled.div`
  padding-bottom: 100px;
  background-color: ${({ theme }) => theme.colors.bg.base};
`;

const Header = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
`;

const Title = styled.h2``;

const User = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  justify-content: space-between;
`;

const ButtonArea = styled.div`
  padding: 8px;
  flex-shrink: 0;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 7px 8px;
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.colors.grey[400]};
  background-color: ${({ theme }) => theme.colors.bg.base};
  color: ${({ theme }) => theme.colors.grey[600]};
  cursor: pointer;
`;

const PictureBox = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.colors.bg.mint10};
  flex-shrink: 0;
`;

const Nickname = styled.div`
  margin-left: 0.5rem;
  font-family: 'SpoqaMedium';
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.grey[600]};
  height: 30px;
  width: 100%;
  position: relative;
  cursor: pointer;
`;

const ItemIcon = styled.img`
  width: 14px;
  object-fit: contain;
  padding-bottom: 2px;
`;

const ItemText = styled.div`
  width: 100%;
`;
const ItemContent = styled.div``;

interface hasIsDark {
  isDark: boolean;
}

const SwitchBox = styled.div<hasIsDark>`
  width: 56px;
  height: 30px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.bg.line};
  border-radius: 15px;
  padding: 4px;
  position: relative;
  transition: background-color 0.3s;

  ${({ isDark }) =>
    isDark &&
    css`
      background-color: ${({ theme }) => theme.colors.bg.mint30};
    `}
`;

const SwitchCircle = styled.div<hasIsDark>(({ isDark }) => [
  css`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.icon.white};
    transition: left 0.3s;
    position: absolute;
    left: calc(0% + 4px);
  `,
  isDark &&
    css`
      left: calc(100% - 26px);
    `,
]);
