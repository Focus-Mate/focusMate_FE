import instance from '@/instance';
import {
  ICharacter,
  ICharacterMainResponse,
} from '@focusmate-types/response/character';
import { useQuery } from 'react-query';

interface ICharacterListResponse {
  character: ICharacter[];
}

export function useGetCharacterList() {
  const { data: characters } = useQuery(
    'Characters/GetCharacters',
    async () => {
      const response = await instance.get<ICharacterListResponse>(
        '/api/user/getcharacter',
      );

      return response.data;
    },
  );

  const { data: mainCharacter } = useQuery(
    'Characters/GetMainCharacter',
    async () => {
      const response = await instance.get<ICharacterMainResponse>(
        '/api/user/getmaincharacter',
      );

      return response.data;
    },
  );

  return { mainCharacter, characters };
}
