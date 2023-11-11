import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useGameStore } from "./game.store";

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
  const players = reactive<Record<Player["id"], Player>>({});

  const upsert = (id: Player["id"], player: Partial<Player>) => {
    if (players[id]) {
      Object.assign(players[id], player);
    } else {
      players[id] = Object.assign(
        {
          id,
          name: "",
          hp: 0,
          max_hp: 0,
          hp_speed: 0,
          money: 0,
          fightLevel: 0,
          fightExp: 0,
          economicLevel: 0,
          economicExp: 0,
          productionLevel: 0,
          productionExp: 0,
          strength: 0,
          accuracy: 0,
          vitality: 0,
          stamina: 0,
          pistolLevel: 0,
          pistolExp: 0,
          explosivesLevel: 0,
          explosivesExp: 0,
          autoLevel: 0,
          autoExp: 0,
          heavyLevel: 0,
          heavyExp: 0,
          shotgunLevel: 0,
          shotgunExp: 0,
          snipeLevel: 0,
          snipeExp: 0,
          bonuses: [],
        },
        player
      );
    }
  };

  const upsertCurrent = (player: Partial<Player>) =>
    upsert(useGameStore().player!.id, player);

  const get = (id: Player["id"]) => players[id];

  return { upsert, upsertCurrent, get };
});
