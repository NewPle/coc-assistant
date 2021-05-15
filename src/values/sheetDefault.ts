import {
  InvestigatorSkills,
  Characteristics,
  Params,
  Combat,
  InvestigatorSkillsWithSkillPoint,
} from "../models";
import { randomInt } from "./randomInt";

export const makeDefaultValues = () => {
  const STR = randomInt(1 * 3, 6 * 3 + 1) * 5;
  const CON = randomInt(1 * 3, 6 * 3 + 1) * 5;
  const POW = randomInt(1 * 3, 6 * 3 + 1) * 5;
  const DEX = randomInt(1 * 3, 6 * 3 + 1) * 5;
  const APP = randomInt(1 * 3, 6 * 3 + 1) * 5;
  const SIZ = randomInt(1 * 2, 6 * 2 + 1) * 5;
  const INT = (randomInt(1 * 2, 6 * 2 + 1) + 6) * 5;
  const EDU = (randomInt(1 * 2, 6 * 2 + 1) + 6) * 5;
  const MOV = makeMOV({ STR, SIZ, DEX });

  const SAN = POW;
  const HP = (CON + SIZ) / 5;
  const LUK = randomInt(1 * 3, 6 * 3 + 1) * 5;
  const MP = POW / 5;

  const BUILD = makeBUILD({ STR, SIZ });
  const DB = makeDB({ STR, SIZ });
  const EVASIONS = Math.floor(DEX / 2);

  const initialSkillPoint = EDU * 4 + INT * 2;

  const characteristics: Characteristics = {
    STR,
    CON,
    POW,
    DEX,
    APP,
    SIZ,
    INT,
    EDU,
    MOV,
    keys: ["STR", "CON", "POW", "DEX", "APP", "SIZ", "INT", "EDU", "MOV"],
  };

  const params: Params = {
    SAN,
    HP,
    LUK,
    MP,
    keys: ["SAN", "HP", "LUK", "MP"],
  };

  const combat: Combat = {
    BUILD,
    DB,
    EVASIONS,
    keys: ["BUILD", "DB", "EVASIONS"],
  };

  const initialInvestigatorSkills: InvestigatorSkillsWithSkillPoint = [
    { name: "威圧", value: 15, skillPoint: 0 },
    { name: "近接戦闘", value: 25, skillPoint: 0 },
    { name: "乗馬", value: 5, skillPoint: 0 },
    { name: "ナビゲート", value: 10, skillPoint: 0 },
    { name: "言いくるめ", value: 5, skillPoint: 0 },
    { name: "信用", value: 0, skillPoint: 0 },
    { name: "変装", value: 5, skillPoint: 0 },
    { name: "医学", value: 1, skillPoint: 0 },
    { name: "心理学", value: 10, skillPoint: 0 },
    { name: "法律", value: 5, skillPoint: 0 },
    { name: "運転(自動車）", value: 20, skillPoint: 0 },
    { name: "クトゥルフ神話", value: 0, skillPoint: 0 },
    { name: "人類学", value: 1, skillPoint: 0 },
    { name: "他言語", value: 1, skillPoint: 0 },
    { name: "応急手当", value: 30, skillPoint: 0 },
    { name: "芸術/製作", value: 5, skillPoint: 0 },
    { name: "水泳", value: 20, skillPoint: 0 },
    { name: "オカルト", value: 5, skillPoint: 0 },
    { name: "精神分析", value: 1, skillPoint: 0 },
    { name: "隠密", value: 20, skillPoint: 0 },
    { name: "説得", value: 10, skillPoint: 0 },
    { name: "母国語", value: characteristics.EDU, skillPoint: 0 },
    { name: "回避", value: Math.floor(characteristics.DEX / 2), skillPoint: 0 },
    { name: "経理", value: 5, skillPoint: 0 },
    { name: "操縦", value: 1, skillPoint: 0 },
    { name: "魅惑", value: 15, skillPoint: 0 },
    { name: "化学", value: 1, skillPoint: 0 },
    { name: "考古学", value: 1, skillPoint: 0 },
    { name: "跳躍", value: 20, skillPoint: 0 },
    { name: "目星", value: 25, skillPoint: 0 },
    { name: "サバイバル", value: 10, skillPoint: 0 },
    { name: "追跡", value: 10, skillPoint: 0 },
    { name: "歴史", value: 5, skillPoint: 0 },
    { name: "自然", value: 10, skillPoint: 0 },
    { name: "手捌き", value: 10, skillPoint: 0 },
    { name: "鍵開け", value: 1, skillPoint: 0 },
    { name: "射撃(拳銃)", value: 20, skillPoint: 0 },
    { name: "電気修理", value: 10, skillPoint: 0 },
    { name: "鑑定", value: 5, skillPoint: 0 },
    { name: "ライフル・ショットガン", value: 25, skillPoint: 0 },
    { name: "投擲", value: 20, skillPoint: 0 },
    { name: "機械修理", value: 10, skillPoint: 0 },
    { name: "登攀", value: 20, skillPoint: 0 },
    { name: "聞き耳", value: 20, skillPoint: 0 },
    { name: "重機械操作", value: 1, skillPoint: 0 },
    { name: "図書館", value: 20, skillPoint: 0 },
  ];
  return {
    initialSkillPoint,
    initialInvestigatorSkills,
    combat,
    params,
    characteristics,
  };
};

const makeBUILD = ({ STR, SIZ }: { STR: number; SIZ: number }): number => {
  if (2 <= STR + SIZ && STR + SIZ <= 64) {
    return -2;
  } else if (STR + SIZ <= 84) {
    return -1;
  } else if (STR + SIZ <= 124) {
    return 0;
  } else if (STR + SIZ <= 164) {
    return 1;
  } else {
    return 2;
  }
};

const makeMOV = ({
  STR,
  SIZ,
  DEX,
}: {
  STR: number;
  SIZ: number;
  DEX: number;
}): number => {
  if (SIZ <= STR && SIZ <= DEX) {
    return 9;
  } else if (STR < SIZ && DEX < SIZ) {
    return 7;
  } else {
    return 8;
  }
};

const makeDB = ({ STR, SIZ }: { STR: number; SIZ: number }): number => {
  if (2 <= STR + SIZ && STR + SIZ <= 64) {
    return -2;
  } else if (STR + SIZ <= 84) {
    return -1;
  } else if (STR + SIZ <= 124) {
    return 0;
  } else if (STR + SIZ <= 164) {
    return randomInt(1, 4 + 1);
  } else {
    return randomInt(1, 6 + 1);
  }
};
