import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const oldBody = ref<string>("");
  const entryUrl = ref<URL | null>(null);

  const path = computed(() => entryUrl.value?.pathname ?? "");
  const isMePage = computed(() => path.value === "/me.php");

  return { oldBody, entryUrl, path, isMePage };
});
