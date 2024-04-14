import instance from '@/instance';

interface IGetStartTimeResponse {
  studyDate: string;
}

export const timerApi = {
  getStartTime: async () => {
    const response = await instance.get<IGetStartTimeResponse>(
      '/api/calculate/timer',
    );

    return response;
  },
  timerStart: async () => {
    const response = await instance.post('/api/calculate/startTime');

    return response;
  },
  timerEnd: async (startPoint: string) => {
    const response = await instance.put<{
      getCharacters: {
        characterImg: string;
        requirement: string;
      }[];
    }>('/api/calculate/endTime', {
      startPoint,
    });

    return response;
  },
};
