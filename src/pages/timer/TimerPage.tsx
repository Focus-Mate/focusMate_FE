import { AnimatePresence } from 'framer-motion';
import useNavigationComp from '@/components/Navigation.hooks';
import { Timer } from '@/components/timer/Timer/Timer';

function TimerPage() {
  const { onExitComplete, getCompareSameTarget } = useNavigationComp();

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {getCompareSameTarget('/timer') && <Timer />}
    </AnimatePresence>
  );
}

export default TimerPage;
