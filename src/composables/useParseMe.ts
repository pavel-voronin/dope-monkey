import { useGameStore } from "../stores/game.store";
import { useLocationStore } from "../stores/location.store";
import { useNavigationStore } from "../stores/navigation.store";
import { usePlayerStore } from "../stores/player.store";

type Input = {
  dom: Document;
  src: string;
};

function parseHpSpeed({ src }: Input) {
  const match = src.match(/hp_speed_h=(\d+\.\d+)/);

  if (!match) return;

  const store = usePlayerStore();

  store.hp_speed = parseFloat(match[1]);
}

function parseHpHeader({ dom, src }: Input) {
  // cSpell:ignore hpheader
  const hpInfo = dom.getElementById("hpheader")?.textContent;

  if (!hpInfo) return;

  const match = hpInfo.match(/\[(\d+)\/(\d+)\]/);

  if (!match) return;

  const store = usePlayerStore();

  store.hp = parseFloat(match[1]);
  store.max_hp = parseFloat(match[2]);
}

function parseSelfNameAndUrl({ dom }: Input) {
  // cSpell:ignore hpheader
  const selfLink = dom.querySelector<HTMLLinkElement>(
    "body > div.gw-container > table:nth-child(1) > tbody > tr:nth-child(1) > td.gw-header-col2 > table > tbody > tr > td:nth-child(1) > nobr > a"
  );

  if (!selfLink) return;

  const store = usePlayerStore();

  store.name = selfLink.textContent!;

  const match = selfLink.href.match(/(\d+)$/);

  if (!match) return;

  store.id = parseInt(match[1]);
}

function parseTimeAndOnline({ dom }: Input) {
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

function parseLocation({ dom }: Input) {
  const location = dom.querySelector<HTMLLinkElement>(
    `#my_main_div > table > tbody > tr > td > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(1) > a`
  );
  console.log(location);

  if (!location) return;

  const store = useLocationStore();

  const match = location.href.match(/sx=(\d+)&sy=(\d+)/);

  if (!match) return;

  store.current = `${match[1]}-${match[2]}`;
}

function parseMoney({ dom }: Input) {
  const money = dom.getElementById("cdiv");

  if (!money) return;

  const store = usePlayerStore();

  store.money = parseInt(money.textContent!.replace(/\D/g, ""));
}

function parseCustomLinks({ dom }: Input) {
  const links = dom.querySelector(
    "body > div.gw-container > div:nth-child(2) > div > center"
  );

  if (!links) return;

  const store = useNavigationStore();

  Array.from(links.children).forEach((link) => {
    const { href, textContent } = link as HTMLLinkElement;
    store.custom.push({ name: textContent!, url: href });
  });
}

export function useParseMe(src: string) {
  const dom = new DOMParser().parseFromString(src, "text/html");

  parseHpHeader({ dom, src });
  parseHpSpeed({ dom, src });
  parseSelfNameAndUrl({ dom, src });
  parseTimeAndOnline({ dom, src });
  parseMoney({ dom, src });
  parseCustomLinks({ dom, src });
  parseLocation({ dom, src });
}
