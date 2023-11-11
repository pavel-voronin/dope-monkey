import { usePlayerStore } from "../stores/player.store";
import { usePlayersStore } from "../stores/players.store";
import type { ParserInput } from "./useParse";

function parseLevels({ dom }: ParserInput) {
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

function parseWeaponLevels({ dom }: ParserInput) {
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

function parseStats({ dom }: ParserInput) {
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

function parseBonuses({ dom }: ParserInput) {
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

export function useParseMe({ dom, src }: ParserInput) {
  parseLevels({ dom, src });
  parseWeaponLevels({ dom, src });
  parseStats({ dom, src });
  parseBonuses({ dom, src });

  const playerStore = usePlayerStore();
  const playersStore = usePlayersStore();
  playersStore.upsert(playerStore.$state);
}
