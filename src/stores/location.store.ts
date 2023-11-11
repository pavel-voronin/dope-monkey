import { defineStore } from "pinia";
import { ref } from "vue";

export const useLocationStore = defineStore("location", () => {
  const current = ref("0-0"); // x-y

  return { current };
});
