import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore("game", () => {
  const time = ref("");
  const online = ref(0);

  return { time, online };
});
