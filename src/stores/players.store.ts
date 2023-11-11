import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export type Player = {
  id: number;
  name: string;

  hp: number;
  max_hp: number;
  hp_speed: number;
  money: number;

  // levels

  fightLevel: number;
  fightExp: number;
  economicLevel: number;
  economicExp: number;
  productionLevel: number;
  productionExp: number;

  // stats

  strength: number;
  accuracy: number;
  vitality: number;
  stamina: number;

  // weapon levels

  pistolLevel: number;
  pistolExp: number;
  explosivesLevel: number;
  explosivesExp: number;
  autoLevel: number;
  autoExp: number;
  heavyLevel: number;
  heavyExp: number;
  shotgunLevel: number;
  shotgunExp: number;
  snipeLevel: number;
  snipeExp: number;

  // // bonuses

  bonuses: { name: string; level: number }[];
};

export const usePlayersStore = defineStore("players", () => {
  const players = reactive<Record<Player["id"], Partial<Player>>>({});

  const upsert = (player: Partial<Player> & Pick<Player, "id">) => {
    if (players[player.id]) {
      // If the player already exists, update their data
      Object.assign(players[player.id], player);
    } else {
      // If the player doesn't exist, add them to the record
      players[player.id] = player as Player;
    }
  };
  const get = (id: Player["id"]) => players[id];

  return { upsert, get };
});
