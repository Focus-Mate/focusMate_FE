declare module '@focusmate-types/response/character' {
  interface ICharacter {
    characterImg: string;
    codeNum: number;
    collected: boolean;
    missionType: string;
    progress: string;
    requirement: string;
    tip: string;
  }

  interface ICharacterMainResponse {
    characterImg: string;
    codeNum: number;
    requirement: string;
  }
}
