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

export interface Characteristics {
  STR: number;
  CON: number;
  POW: number;
  DEX: number;
  APP: number;
  SIZ: number;
  INT: number;
  EDU: number;
  MOV: number;
  keys: ["STR", "CON", "POW", "DEX", "APP", "SIZ", "INT", "EDU", "MOV"];
}

export interface Params {
  SAN: number;
  HP: number;
  LUK: number;
  MP: number;
  keys: ["SAN", "HP", "LUK", "MP"];
}

export interface Combat {
  BUILD: number;
  DB: number;
  EVASIONS: number;
  keys: ["BUILD", "DB", "EVASIONS"];
}
