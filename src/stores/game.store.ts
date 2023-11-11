import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type { Player } from "./players.store";
import type { Location } from "./locations.store";

export const useGameStore = defineStore("game", () => {
  const time = ref("");
  const online = ref(0);
  const player = ref<Player | null>(null);
  const location = ref<Location | null>(null);
  const customNavigation = reactive<{ name: string; url: string }[]>([]);

  return { time, online, player, location, customNavigation };
});
