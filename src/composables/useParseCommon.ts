// cSpell:ignore cdiv hpheader pdanavybar

import { useGameStore } from "../stores/game.store";
import { usePlayersStore } from "../stores/players.store";
import { useLocationsStore } from "../stores/locations.store";
import { type ParserInput } from "./useRouter";

function parseCurrentPlayer({ dom }: ParserInput) {
  const gameStore = useGameStore();
  const playersStore = usePlayersStore();

  const selfLink = dom.querySelector<HTMLLinkElement>(
    "body > div.gw-container > table:nth-child(1) > tbody > tr:nth-child(1) > td.gw-header-col2 > table > tbody > tr > td:nth-child(1) > nobr > a"
  );

  if (!selfLink) return;

  const match = selfLink.href.match(/(\d+)$/);

  if (!match) return; // todo: change the flow, maybe exceptions?

  const id = parseInt(match[1]);
  const name = selfLink.textContent!;

  playersStore.upsert(id, { name });

  gameStore.player = playersStore.get(id);
}

function parseHpSpeed({ src }: ParserInput) {
  const match = src.match(/hp_speed=(\d+\.\d+)/);

  if (!match) return;

  usePlayersStore().upsertCurrent({ hp_speed: parseFloat(match[1]) });
}

function parseHpHeader({ dom }: ParserInput) {
  const hpInfo = dom.getElementById("hpheader")?.textContent;

  if (!hpInfo) return;

  const match = hpInfo.match(/\[(\d+)\/(\d+)\]/);

  if (!match) return;

  usePlayersStore().upsertCurrent({
    hp: parseFloat(match[1]),
    max_hp: parseFloat(match[2]),
  });
}

function parseTimeAndOnline({ dom }: ParserInput) {
  const timeAndOnline = dom.querySelector<HTMLLinkElement>(
    `body > div.gw-container > table > tbody > tr:nth-child(1) > td.gw-header-col2 > table > tbody > tr > td:nth-child(3) > nobr > div`
  );

  if (!timeAndOnline) return;

  const store = useGameStore();

  const match = timeAndOnline.textContent?.match(/(\d\d:\d\d), (\d+) онлайн/);

  if (!match) return;

  store.time = match[1];
  store.online = parseInt(match[2]);
}

function parseMoney({ dom }: ParserInput) {
  const money = dom.getElementById("cdiv");

  if (!money) return;

  usePlayersStore().upsertCurrent({
    money: parseInt(money.textContent!.replace(/\D/g, "")),
  });
}

function parseCustomLinks({ dom }: ParserInput) {
  const links = dom.querySelector(
    "body > div.gw-container > div:nth-child(2) > div > center"
  );

  if (!links) return;

  Array.from(links.children).forEach((link) => {
    const { href, textContent } = link as HTMLLinkElement;
    useGameStore().customNavigation.push({ name: textContent!, url: href });
  });
}

function parsePlayerLocation({ dom }: ParserInput) {
  const location = dom.querySelector<HTMLLinkElement>(
    `#pdanavybar > span > span:nth-child(2) > div > div:nth-child(2) > a`
  );

  if (!location) return;

  const match = location.href.match(/sx=(\d+)&sy=(\d+)/);

  if (!match) return;

  useGameStore().location = useLocationsStore().get(
    parseInt(match[1]),
    parseInt(match[2])
  );
}

export function useParseCommon(input: ParserInput) {
  parseCurrentPlayer(input); // the most important one so far

  parseHpHeader(input);
  parseHpSpeed(input);
  parseTimeAndOnline(input);
  parseMoney(input);
  parseCustomLinks(input);
  parsePlayerLocation(input);
}
