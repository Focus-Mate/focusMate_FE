const isError = false;

export default function useTimerQuery() {
  // get
  const requestGetPlayState = async () => {
    return isError
      ? null
      : {
          studyDate: '2023-10-29T11:56:22.293Z',
        };
  };

  // post
  const requestTimerStart = async ({ startPoint }: { startPoint: string }) => {
    return {
      startPoint: '2023-10-29T11:56:22.293Z',
    };
  };

  // put
  const requestTimerStop = async () => {
    return isError
      ? {
          getCharacters: [],
        }
      : {
          getCharacters: [
            {
              characterImg:
                'https://focusmate-b.s3.ap-northeast-2.amazonaws.com/characters/Panda.gif',
              requirement: '출석 5일차',
            },
          ],
        };
  };

  return {
    requestGetPlayState,
    requestTimerStart,
    requestTimerStop,
  };
}
