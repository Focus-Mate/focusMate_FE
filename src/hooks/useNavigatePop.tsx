import { NavigateOptions, useNavigate } from 'react-router-dom';

const useNavigatePop = () => {
  const navigate = useNavigate();

  const navigatePop = (path: string, options?: NavigateOptions) => {
    navigate(path, {
      ...options,
      state: { ...options?.state, direction: 'navigate-pop' },
    });
  };

  return navigatePop;
};

export default useNavigatePop;
