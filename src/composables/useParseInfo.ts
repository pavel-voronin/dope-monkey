import { usePlayersStore } from "../stores/players.store";
import { useParseCommon } from "./useParseCommon";
import { type ParserInput } from "./useRouter";

export function useParseInfo(input: ParserInput) {
  useParseCommon(input);

  usePlayersStore().upsert(input.params!.id as unknown as number, {});
}
