import { motion } from 'framer-motion';
import styled from 'styled-components';

import allStudyPng from '@/assets/images/illust_everystudy.png';

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

export default function AllStudiesReady() {
  return (
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
          모든 스터디 탭에서
          <br />곧 만나요!
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
          '모든 스터디'에서는 스터디를
          <br />
          만들거나, 참여할 수 있어요.
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
          <img src={allStudyPng} alt="my study" />
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
            잠깐! 5분 설문조사 참여하고
            <br />
            이벤트 상품 받아가세요
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
          설문조사 참여하기
        </Button>
      </BottomView>
    </Content>
  );
}

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 70px 0 40px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

const Title = styled(motion.div)`
  width: 248px;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  margin: 0 auto;
  font-weight: bold;
  position: relative;
  color: ${({ theme }) => theme.colors.grey[900]};
`;

const Description = styled(motion.div)`
  width: 248px;
  position: relative;
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
  position: relative;

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
  position: relative;
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
  position: relative;
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
