import { usePlayerStore } from "../stores/player.store";

function parseHpHeader(dom: Document) {
  // cSpell:ignore hpheader
  const hpInfo = dom.getElementById("hpheader")?.textContent;

  if (!hpInfo) return;

  const match = hpInfo.match(/\[(\d+)\/(\d+)\]/);

  if (!match) return;

  const store = usePlayerStore();

  store.hp = parseFloat(match[1]);
  store.max_hp = parseFloat(match[2]);
}

function parseSelfNameAndUrl(dom: Document) {
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

export function useParseMe(document: string) {
  const dom = new DOMParser().parseFromString(document, "text/html");

  parseHpHeader(dom);
  parseSelfNameAndUrl(dom);
}
