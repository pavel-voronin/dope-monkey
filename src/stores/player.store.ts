import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlayerStore = defineStore("player", () => {
  const id = ref(0);
  const name = ref("");
  const hp = ref(0);
  const max_hp = ref(0);

  return { id, name, hp, max_hp };
});
