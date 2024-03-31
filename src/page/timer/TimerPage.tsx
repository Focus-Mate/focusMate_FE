import { AnimatePresence } from 'framer-motion';
import useNavigationComp from '@/component/Navigation.hooks';
import { Timer } from '@/component/timer/Timer/Timer';

function TimerPage() {
  const { onExitComplete, getCompareSameTarget } = useNavigationComp();

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {getCompareSameTarget('/timer') && <Timer />}
    </AnimatePresence>
  );
}

export default TimerPage;
