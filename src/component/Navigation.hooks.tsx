import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { navAtoms } from './Navigation.atoms';
import { useEffect } from 'react';

export default function useNavigationComp() {
  const navigate = useNavigate();
  const [pageMoveTarget, setPageMoveTarget] = useRecoilState(
    navAtoms.pageMoveTarget,
  );
  const location = useLocation();

  useEffect(() => {
    if (pageMoveTarget === null) {
      setPageMoveTarget(location.pathname);
    }
  }, [setPageMoveTarget, location.pathname, pageMoveTarget]);

  const onExitComplete = () => {
    if (pageMoveTarget !== null) {
      navigate(pageMoveTarget);
    }
  };

  const getCompareSameTarget = (target: string) => {
    if (pageMoveTarget === target) {
      return true;
    }

    return false;
  };

  return { onExitComplete, getCompareSameTarget };
}
