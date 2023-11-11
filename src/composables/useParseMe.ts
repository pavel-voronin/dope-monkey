// cSpell:ignore paramsdiv bonusesdiv

import { useGameStore } from "../stores/game.store";
import { usePlayersStore } from "../stores/players.store";
import type { ParserInput } from "./useParse";

function parseLevels({ dom }: ParserInput) {
  const fight = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(1) > table:nth-child(1) > tbody > tr:nth-child(1) > td:nth-child(2) > nobr"
  );
  const economic = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(1) > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > nobr"
  );
  const production = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(1) > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(2) > nobr"
  );

  if (!fight) return;
  if (!economic) return;
  if (!production) return;

  usePlayersStore().upsertCurrent({
    fightLevel: parseInt(fight.children[0].textContent!),
    fightExp: parseFloat(fight.children[1].textContent!),
    economicLevel: parseInt(economic.children[0].textContent!),
    economicExp: parseFloat(economic.children[1].textContent!),
    productionLevel: parseInt(production.children[0].textContent!),
    productionExp: parseFloat(production.children[1].textContent!),
  });
}

function parseWeaponLevels({ dom }: ParserInput) {
  const pistol = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td.txt > nobr"
  );
  const explosives = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td.txt > nobr"
  );
  const auto = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td.txt > nobr"
  );
  const heavy = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(4) > td.txt > nobr"
  );
  const shotgun = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(5) > td.txt > nobr"
  );
  const snipe = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(6) > td.txt > nobr"
  );

  if (!pistol) return;
  if (!explosives) return;
  if (!auto) return;
  if (!heavy) return;
  if (!shotgun) return;
  if (!snipe) return;

  usePlayersStore().upsertCurrent({
    pistolLevel: parseInt(pistol.children[1].textContent!),
    pistolExp: parseFloat(pistol.children[2].textContent!),
    explosivesLevel: parseInt(explosives.children[1].textContent!),
    explosivesExp: parseFloat(explosives.children[2].textContent!),
    autoLevel: parseInt(auto.children[1].textContent!),
    autoExp: parseFloat(auto.children[2].textContent!),
    heavyLevel: parseInt(heavy.children[1].textContent!),
    heavyExp: parseFloat(heavy.children[2].textContent!),
    shotgunLevel: parseInt(shotgun.children[1].textContent!),
    shotgunExp: parseFloat(shotgun.children[2].textContent!),
    snipeLevel: parseInt(snipe.children[1].textContent!),
    snipeExp: parseFloat(snipe.children[2].textContent!),
  });
}

function parseStats({ dom }: ParserInput) {
  const strength = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(2)"
  );
  const accuracy = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2)"
  );
  const vitality = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(2)"
  );
  const stamina = dom.querySelector(
    "#paramsdiv > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(2)"
  );

  if (!strength) return;
  if (!accuracy) return;
  if (!vitality) return;
  if (!stamina) return;

  usePlayersStore().upsertCurrent({
    strength: parseInt(strength.childNodes[0].textContent!),
    accuracy: parseInt(accuracy.childNodes[0].textContent!),
    vitality: parseInt(vitality.childNodes[0].textContent!),
    stamina: parseInt(stamina.childNodes[0].textContent!),
  });
}

function parseBonuses({ dom }: ParserInput) {
  const bonuses = dom.querySelector(
    "#bonusesdiv > table > tbody > tr > td:nth-child(1) > table > tbody"
  );

  if (!bonuses) return;

  Array.from(bonuses.children).forEach((bonus) => {
    const name = bonus.children[0].textContent!;
    const level = parseInt(bonus.children[1].textContent!);

    useGameStore().player!.bonuses.push({ name, level });
  });
}

export function useParseMe({ dom, src }: ParserInput) {
  parseLevels({ dom, src });
  parseWeaponLevels({ dom, src });
  parseStats({ dom, src });
  parseBonuses({ dom, src });
}
