export function isEmptyArr(arr: []) {
  if (Array.isArray(arr) && arr.length === 0) {
    return true;
  }
  return false;
}
