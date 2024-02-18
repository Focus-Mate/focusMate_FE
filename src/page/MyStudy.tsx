import styled from 'styled-components';

import myStudyPng from '@/style/images/illust_mystudy.png';
import { AnimatePresence, motion } from 'framer-motion';
import useNavigationComp from '@/component/Navigation.hooks';

const motionVariants = {
  hidden: {
    opacity: 0,
    transform: 'translateY(100px)',
  },
  visible: {
    opacity: 1,
    transform: 'translateY(0)',
  },
};

interface Props {}

function MyStudy(props: Props) {
  const { onExitComplete, getCompareSameTarget } = useNavigationComp();

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {getCompareSameTarget('/mystudy') && (
        <Container
          exit={{
            opacity: 0,
            transition: {
              duration: 0.3,
            },
          }}
        >
          <Content>
            <TopView>
              <Title
                variants={motionVariants}
                initial={'hidden'}
                animate={'visible'}
                transition={{
                  delay: 0.3,
                  duration: 0.1,
                  stiffness: 10,
                }}
              >
                나의 스터디 탭을
                <br />
                준비중이에요.
              </Title>
              <Description
                variants={motionVariants}
                initial={'hidden'}
                animate={'visible'}
                transition={{
                  delay: 0.5,
                  duration: 0.1,
                  stiffness: 10,
                }}
              >
                '나의 스터디'에서는 팀원과
                <br />
                스터디를 함께 할 수 있어요.
              </Description>
              <Square
                initial={{
                  opacity: 0,
                  transform: 'scale(0.5)',
                }}
                animate={{
                  opacity: 1,
                  transform: 'scale(1)',
                }}
                transition={{
                  delay: 0.7,
                  duration: 0.1,
                  stiffness: 10,
                }}
              >
                <img src={myStudyPng} alt="my study" />
              </Square>
            </TopView>
            <BottomView>
              <TipBox
                variants={motionVariants}
                initial={'hidden'}
                animate={'visible'}
                transition={{
                  delay: 0.9,
                  duration: 0.1,
                  stiffness: 10,
                }}
              >
                <TipTitle>TIP</TipTitle>
                <Comment>
                  앱 사용 후기를 남겨주시면
                  <br />더 멋진 서비스로 찾아올게요!
                </Comment>
              </TipBox>
              <Button
                variants={motionVariants}
                initial={'hidden'}
                animate={'visible'}
                transition={{
                  delay: 1.1,
                  duration: 0.1,
                  stiffness: 10,
                }}
              >
                의견 남기러 가기
              </Button>
            </BottomView>
          </Content>
        </Container>
      )}
    </AnimatePresence>
  );
}

export default MyStudy;

const Container = styled(motion.div)`
  display: flex;
  width: 100%;
  height: calc(100% - 75px);
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  background-color: ${({ theme }) => theme.colors.bg.base};
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 70px 0 40px;
  overflow-y: scroll;
`;

const Title = styled(motion.div)`
  width: 248px;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.grey[900]};
`;

const Description = styled(motion.div)`
  width: 248px;
  text-align: center;
  margin: 20px auto 0;
  line-height: 25px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey[600]};
`;

const Square = styled(motion.div)`
  width: 250px;
  height: 250px;
  margin: 70px auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TipBox = styled(motion.div)`
  width: calc(100% - 40px);
  margin: 0 auto;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.bg.mint10};
  border-radius: 16px;
  display: flex;
`;

const TipTitle = styled.div`
  width: 40px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.icon.white};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.primary[700]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Comment = styled.div`
  margin-left: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.grey[800]};
`;

const Button = styled(motion.button)`
  width: calc(100% - 40px);
  border: 0;
  outline: 0;
  height: 48px;
  margin: 20px auto 0;
  color: ${({ theme }) => theme.colors.bg.base};
  background-color: ${({ theme }) => theme.colors.primary[700]};
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  flex-shrink: 0;
`;

const TopView = styled.div``;
const BottomView = styled.div``;
