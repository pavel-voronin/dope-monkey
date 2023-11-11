import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/app.store";
import type { ParserInput } from "./useParse";
import { usePlayersStore } from "../stores/players.store";

export function useParseInfo({ dom, src }: ParserInput) {
  const appStore = useAppStore();
  const { currentPageProps } = storeToRefs(appStore); // BUG! cannot do it! this may be next requested page, not current

  const playersStore = usePlayersStore();

  playersStore.upsert({
    id: currentPageProps.value!.id as unknown as number,
  });
}
