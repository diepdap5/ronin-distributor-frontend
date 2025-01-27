export type Status = "active" | "paused" | "vacation";

export type Member = { 
    id: number; 
    name: string; 
    role: string; 
    team: string; 
    status: Status; 
    nickname: string;
};
export const members: Member[] = [
  {
    id: 1,
    name: "umih4ra",
    role: "Guild Leader",
    team: "DPS",
    status: "active",
    nickname: "umi",
  },
  {
    id: 2,
    name: "NasuChan",
    role: "Old Guilder",
    team: "Healer",
    status: "paused",
    nickname: "nasu",
  },
  {
    id: 3,
    name: "Velyns",
    role: "Member",
    team: "Tank",
    status: "active",
    nickname: "Velyns",
  },
  {
    id: 4,
    name: "sadboyyyyy",
    role: "Advisor",
    team: "DPS",
    status: "vacation",
    nickname: "sasa",
  },
  {
    id: 5,
    name: "Banology",
    role: "Guardian",
    team: "DPS",
    status: "active",
    nickname: "bano",
  },
];