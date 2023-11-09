import { defineStore } from "pinia";
import { reactive } from "vue";

export const useNavigationStore = defineStore("navigation", () => {
  const custom = reactive<{ name: string; url: string }[]>([]);

  return { custom };
});
