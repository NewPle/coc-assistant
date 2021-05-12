export type Sheets = Sheet[];

export interface Sheet {
  characterName: string;
  userName: string;
  age: number;
  gender: string;
  occupation: string;
  belongings: string[];
  weapons: string[];
  background: string;
  investigatorSkills: InvestigatorSkills;
  characteristics: Characteristics;
  isParticipating: boolean;
  injury: string[];
  key: string;
}

export type InvestigatorSkills = InvestigatorSkill[];

export interface InvestigatorSkill {
  name: string;
  value: number;
  skillPoint: number;
}

interface Characteristics {
  STR: number;
  CON: number;
  POW: number;
  DEX: number;
  APP: number;
  SIZ: number;
  INT: number;
  EDU: number;
  MOV: number;
  keys: string[];
}
