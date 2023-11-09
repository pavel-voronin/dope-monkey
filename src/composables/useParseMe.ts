import { useGameStore } from "../stores/game.store";
import { useNavigationStore } from "../stores/navigation.store";
import { usePlayerStore } from "../stores/player.store";

type Input = {
  dom: Document;
  src: string;
};

function parseHpHeader({ dom }: Input) {
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
  parseSelfNameAndUrl({ dom, src });
  parseTimeAndOnline({ dom, src });
  parseMoney({ dom, src });
  parseCustomLinks({ dom, src });
}
