export type LootType = "Weapon" | "Armor" | "Legs"| "Cloak"| "Belt"| "Feet"| "Hat";

export const lootTypes: LootType[] = ["Weapon", "Armor", "Legs", "Cloak", "Belt", "Feet", "Hat"];

export type Request = {
  rid: number;
  requesterName: string;
  requestReason: number;
  // 0: Main gear
  // 1: Alternative gear
  // 2: Trait
  // 3: Litho
  createdAt: string;
}


export type Loot = { 
    id: number; 
    name: string; 
    type: LootType; 
    accquirer: string; 
    belongsTo: string; 
    distributedTo: string; 
    avaiableUntil: string;
    avatar: string; 
    requestHistory: Request[];
};
export const loots: Loot[] = [
  {
    id: 1,
    name: "Aridus's Gnarled Voidstaff",
    type: "Weapon",
    accquirer: "NasuChan",
    belongsTo: "Guild",
    distributedTo: "Velyns",
    avaiableUntil: "2025-04-07T18:45:22Z",
    avatar: "https://throneandliberty.gameslantern.com/storage/sites/throne-and-liberty/items/IT_P_Bow_00034.webp",
    requestHistory: [
      {rid: 1, requesterName: "Banology", requestReason: 0, createdAt: "2025-01-07T18:45:22Z"},
      {rid: 4, requesterName: "umih4ra", requestReason: 1, createdAt: "2025-01-08T05:42:22Z"},
      {rid: 5, requesterName: "Velyns", requestReason: 2, createdAt: "2025-01-09T04:02:35Z"},
      {rid: 6, requesterName: "sadboyyyyy", requestReason: 3, createdAt: "2025-01-11T05:20:05Z"},
      {rid: 7, requesterName: "NasuChan", requestReason: 1, createdAt: "2025-01-12T05:42:22Z"},
    ],
  },
  {
    id: 2,
    name: "Shock Commander Greaves",
    type: "Legs",
    accquirer: "umih4ra",
    belongsTo: "umih4ra",
    distributedTo: "umih4ra",
    avaiableUntil: "2025-03-02T08:33:22Z",
    avatar: "https://throneandliberty.gameslantern.com/storage/sites/throne-and-liberty/items/P_M_CA_00019.webp",
    requestHistory: [{rid: 2, requesterName: "NasuChan", requestReason: 0, createdAt: "2024-12-07T18:45:22Z"}],

  },
  {
    id: 3,
    name: "Nirma's Sword of Echoes",
    type: "Weapon",
    accquirer: "Banology",
    belongsTo: "Guild",
    distributedTo: "umih4ra",
    avaiableUntil: "2025-01-04T03:21:00Z",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    requestHistory: [],
  },
  {
    id: 4,
    name: "Belt of Bloodlust",
    type: "Belt",
    accquirer: "sadboyyyyy",
    belongsTo: "Guild",
    distributedTo: "sadboyyyyy",
    avaiableUntil: "2025-01-07T18:45:22Z",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    requestHistory: [{rid: 3, requesterName: "Banology", requestReason: 3, createdAt: "2025-01-04T08:33:22Z"}],
  },
  {
    id: 5,
    name: "Divine Justiciar Shoes",
    type: "Feet",
    accquirer: "NasuChan",
    belongsTo: "NasuChan",
    distributedTo: "umih4ra",
    avaiableUntil: "2025-02-07T18:45:22Z",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    requestHistory: [],
  },
  {
    id: 6,
    name: "Nirma's Sword of Echoes",
    type: "Weapon",
    accquirer: "NasuChan",
    belongsTo: "Guild",
    distributedTo: "sadboyyyyy",
    avaiableUntil: "2025-07-04T03:21:00Z",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    requestHistory: [],
  },
];