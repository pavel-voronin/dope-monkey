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

function parseLevels({ dom }: Input) {
  const store = usePlayerStore();

  const fight = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(1) > table:nth-child(1) > tbody > tr:nth-child(1) > td:nth-child(2) > nobr"
  );

  if (!fight) return;

  store.fightLevel = parseInt(fight.children[0].textContent!);
  store.fightExp = parseFloat(fight.children[1].textContent!);

  const economic = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(1) > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > nobr"
  );

  if (!economic) return;

  store.economicLevel = parseInt(economic.children[0].textContent!);
  store.economicExp = parseFloat(economic.children[1].textContent!);

  const production = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(1) > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(2) > nobr"
  );

  if (!production) return;

  store.productionLevel = parseInt(production.children[0].textContent!);
  store.productionExp = parseFloat(production.children[1].textContent!);
}

function parseWeaponLevels({ dom }: Input) {
  const store = usePlayerStore();

  const pistol = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td.txt > nobr"
  );

  if (!pistol) return;

  const explosives = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td.txt > nobr"
  );

  if (!explosives) return;

  const auto = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td.txt > nobr"
  );

  if (!auto) return;

  const heavy = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(4) > td.txt > nobr"
  );

  if (!heavy) return;

  const shotgun = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(5) > td.txt > nobr"
  );

  if (!shotgun) return;

  const snipe = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(6) > td.txt > nobr"
  );

  if (!snipe) return;

  store.pistolLevel = parseInt(pistol.children[1].textContent!);
  store.pistolExp = parseFloat(pistol.children[2].textContent!);
  store.explosivesLevel = parseInt(explosives.children[1].textContent!);
  store.explosivesExp = parseFloat(explosives.children[2].textContent!);
  store.autoLevel = parseInt(auto.children[1].textContent!);
  store.autoExp = parseFloat(auto.children[2].textContent!);
  store.heavyLevel = parseInt(heavy.children[1].textContent!);
  store.heavyExp = parseFloat(heavy.children[2].textContent!);
  store.shotgunLevel = parseInt(shotgun.children[1].textContent!);
  store.shotgunExp = parseFloat(shotgun.children[2].textContent!);
  store.snipeLevel = parseInt(snipe.children[1].textContent!);
  store.snipeExp = parseFloat(snipe.children[2].textContent!);
}

function parseStats({ dom }: Input) {
  const store = usePlayerStore();

  const strength = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(2)"
  );

  if (!strength) return;

  const accuracy = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2)"
  );

  if (!accuracy) return;

  const vitality = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(2)"
  );

  if (!vitality) return;

  const stamina = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(2)"
  );

  if (!stamina) return;

  store.strength = parseInt(strength.childNodes[0].textContent!);
  store.accuracy = parseInt(accuracy.childNodes[0].textContent!);
  store.vitality = parseInt(vitality.childNodes[0].textContent!);
  store.stamina = parseInt(stamina.childNodes[0].textContent!);
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

function parseBonuses({ dom }: Input) {
  const bonuses = dom.querySelector(
    "#bonusesdiv > table > tbody > tr > td:nth-child(1) > table > tbody"
  );

  if (!bonuses) return;

  const store = usePlayerStore();

  Array.from(bonuses.children).forEach((bonus) => {
    const name = bonus.children[0].textContent!;
    const level = parseInt(bonus.children[1].textContent!);

    store.bonuses.push({ name, level });
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
  parseLevels({ dom, src });
  parseWeaponLevels({ dom, src });
  parseStats({ dom, src });
  parseBonuses({ dom, src });
}
