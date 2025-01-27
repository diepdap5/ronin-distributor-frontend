export type LootType = "Weapon" | "Armor" | "Legs"| "Cloak"| "Belt"| "Feet";

export type Loot = { 
    id: number; 
    name: string; 
    type: LootType; 
    accquirer: string; 
    belongs_to: string; 
    distributed_to: string; 
    avaiable_until: string;
    avatar: string; 
};
export const loots: Loot[] = [
  {
    id: 1,
    name: "Aridus's Gnarled Voidstaff",
    type: "Weapon",
    accquirer: "NasuChan",
    belongs_to: "Guild",
    distributed_to: "Velyns",
    avaiable_until: "2025-04-07T18:45:22Z",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",

  },
  {
    id: 2,
    name: "Shock Commander Greaves",
    type: "Legs",
    accquirer: "umih4ra",
    belongs_to: "umih4ra",
    distributed_to: "umih4ra",
    avaiable_until: "2025-03-02T08:33:22Z",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",

  },
  {
    id: 3,
    name: "Nirma's Sword of Echoes",
    type: "Weapon",
    accquirer: "Banology",
    belongs_to: "Guild",
    distributed_to: "umih4ra",
    avaiable_until: "2025-01-04T03:21:00Z",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",

  },
  {
    id: 4,
    name: "Belt of Bloodlust",
    type: "Belt",
    accquirer: "sadboyyyyy",
    belongs_to: "Guild",
    distributed_to: "sadboyyyyy",
    avaiable_until: "2025-01-07T18:45:22Z",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",

  },
  {
    id: 5,
    name: "Divine Justiciar Shoes",
    type: "Feet",
    accquirer: "NasuChan",
    belongs_to: "NasuChan",
    distributed_to: "umih4ra",
    avaiable_until: "2025-02-07T18:45:22Z",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
  },
  {
    id: 6,
    name: "Nirma's Sword of Echoes",
    type: "Weapon",
    accquirer: "NasuChan",
    belongs_to: "Guild",
    distributed_to: "sadboyyyyy",
    avaiable_until: "2025-07-04T03:21:00Z",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",

  },
];