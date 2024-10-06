import { atom } from 'recoil';

export const navAtoms = {
  pageMoveTarget: atom<null | string>({
    key: 'pageMoveTarget',
    default: null,
  }),
};
