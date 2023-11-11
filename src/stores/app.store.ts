import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useParseMe } from "../composables/useParseMe";
import { useParseInfo } from "../composables/useParseInfo";
import MePage from "../components/pages/MePage.vue";
import InfoPage from "../components/pages/InfoPage.vue";

export const useAppStore = defineStore("app", () => {
  const entryUrl = ref<URL | null>(null);

  const path = computed(() => entryUrl.value?.pathname ?? "");
  const params = computed(() =>
    entryUrl.value ? new URL(entryUrl.value!.href).searchParams : undefined
  );
  const is = (page: string) => path.value === page;

  const currentPage = computed(() => {
    if (is("/me.php")) return MePage;
    if (is("/info.php")) return InfoPage;
  });
  const currentPageParser = computed(() => {
    if (is("/me.php")) return useParseMe;
    if (is("/info.php")) return useParseInfo;
  });
  const currentPageProps = computed(() => {
    if (is("/me.php")) return {};
    if (is("/info.php")) return { id: params.value!.get("id") };
  });

  return {
    entryUrl,
    path,
    currentPage,
    currentPageProps,
    currentPageParser,
  };
});
