// 개발 모드, 배포 모드에 따라 다르게 보이게 하기 위한 HOC

import { envConfig } from '@/util/env-config';

interface Props {
  children: React.ReactNode;
  isShow?: boolean;
}

// env mode가 development일 경우에만 보이게 하는 HOC이지만 isShow가 true일 경우에도 보이게 할 수 있음
export function DevHoc({ children, isShow }: Props) {
  const isComponentShow = envConfig.MODE === 'DEVELOPMENT' || isShow;

  return <>{isComponentShow ? children : null}</>;
}

// env mode가 release일 경우에만 보이게 하는 HOC이지만 isShow가 true일 경우에도 보이게 할 수 있음
export function ReleaseHoc({ children, isShow }: Props) {
  const isComponentShow = envConfig.MODE === 'RELEASE' || isShow;

  return <>{isComponentShow ? children : null}</>;
}
