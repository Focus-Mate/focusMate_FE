import styled from 'styled-components';

import { AnimatePresence, motion } from 'framer-motion';
import useNavigationComp from '@/component/Navigation.hooks';
import AllStudiesReady from '@/component/allstudies/AllStudiesReady';

interface Props {}

function AllStudies(props: Props) {
  const { onExitComplete, getCompareSameTarget } = useNavigationComp();

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {getCompareSameTarget('/allstudies') && (
        <Container
          exit={{
            opacity: 0,
            transition: {
              duration: 0.3,
            },
          }}
        >
          <AllStudiesReady />
        </Container>
      )}
    </AnimatePresence>
  );
}

export default AllStudies;

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
