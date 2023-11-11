import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const usePlayerStore = defineStore("player", () => {
  const id = ref(0);
  const name = ref("");
  const hp = ref(0);
  const max_hp = ref(0);
  const hp_speed = ref(0);
  const money = ref(0);

  // levels

  const fightLevel = ref(0);
  const fightExp = ref(0);
  const economicLevel = ref(0);
  const economicExp = ref(0);
  const productionLevel = ref(0);
  const productionExp = ref(0);

  // stats

  const strength = ref(0);
  const accuracy = ref(0);
  const vitality = ref(0);
  const stamina = ref(0);

  // weapon levels

  const pistolLevel = ref(0);
  const pistolExp = ref(0);
  const explosivesLevel = ref(0);
  const explosivesExp = ref(0);
  const autoLevel = ref(0);
  const autoExp = ref(0);
  const heavyLevel = ref(0);
  const heavyExp = ref(0);
  const shotgunLevel = ref(0);
  const shotgunExp = ref(0);
  const snipeLevel = ref(0);
  const snipeExp = ref(0);

  // bonuses

  const bonuses = reactive<{ name: string; level: number }[]>([]);

  return {
    id,
    name,
    hp,
    max_hp,
    money,
    hp_speed,
    fightLevel,
    economicLevel,
    productionLevel,
    fightExp,
    economicExp,
    productionExp,
    strength,
    accuracy,
    vitality,
    stamina,
    pistolLevel,
    pistolExp,
    explosivesLevel,
    explosivesExp,
    autoLevel,
    autoExp,
    heavyLevel,
    heavyExp,
    shotgunLevel,
    shotgunExp,
    snipeLevel,
    snipeExp,
    bonuses,
  };
});
