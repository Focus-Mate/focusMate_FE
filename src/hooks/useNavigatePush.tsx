import { NavigateOptions, useNavigate } from 'react-router-dom';

const useNavigatePush = () => {
  const navigate = useNavigate();

  const navigatePush = (path: string, options?: NavigateOptions) => {
    navigate(path, {
      ...options,
      state: { ...options?.state, direction: 'navigate-push' },
    });
  };

  return navigatePush;
};

export default useNavigatePush;
