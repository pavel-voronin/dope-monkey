import { defineStore } from "pinia";
import { Component, ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const entryUrl = ref<Location>();
  const currentRoute = ref<
    | {
        component: Component;
        props: Record<string, string | number>;
      }
    | undefined
  >();

  return {
    entryUrl,
    currentRoute,
  };
});
