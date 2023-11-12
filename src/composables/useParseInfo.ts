// cSpell:ignore namespan

import { useLocationsStore } from "../stores/locations.store";
import { type Player, usePlayersStore } from "../stores/players.store";
import { useParseCommon } from "./useParseCommon";
import { type ParserInput } from "./useRouter";

function parseName({ dom }: ParserInput): Partial<Player> | void {
  const name = dom.getElementById("namespan");

  if (!name) return;

  return { name: name.textContent! };
}

function parseHp({ dom }: ParserInput): Partial<Player> | void {
  const hp = dom.querySelector(
    "#info_php_page > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(2) > div"
  );

  if (!hp) return;

  const match = hp.childNodes[2].textContent?.match(/(\d+)\D+(\d+)/);

  if (!match) return;

  return {
    hp: parseFloat(match[1]),
    max_hp: parseFloat(match[2]),
  };
}

function parseMoney({ dom }: ParserInput): Partial<Player> | void {
  const money = dom.querySelector(
    "#info_php_page > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(3)"
  );

  if (!money) return;

  return {
    money: parseFloat(money.textContent!.replaceAll(/\D/, "")),
  };
}

function parseStatus({ dom }: ParserInput): Partial<Player> | void {
  const status = dom.querySelector(
    "#info_php_page > table:nth-child(2) > tbody > tr:nth-child(2) > td > table:nth-child(3) > tbody > tr > td > div:nth-child(2)"
  );

  if (!status) return;

  const match = status.textContent!.match(/Статус: (.*)/);

  if (!match) return;

  return {
    status: match[1],
  };
}

function parseLocation({ dom }: ParserInput): Partial<Player> | void {
  const location = dom.querySelector<HTMLLinkElement>(
    "#info_php_page > table:nth-child(2) > tbody > tr:nth-child(2) > td > table:nth-child(3) > tbody > tr > td > a"
  );

  if (!location) return;

  return {
    location: useLocationsStore().get(location.href),
  };
}

function parseKarma({ dom }: ParserInput): Partial<Player> | void {
  const karma = dom.querySelector<HTMLLinkElement>(
    "#info_php_page > table:nth-child(2) > tbody > tr:nth-child(2) > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td:nth-child(1) > font > b"
  );

  if (!karma) return;

  return {
    karma: parseFloat(karma.textContent!),
  };
}

function parseLevels({ dom }: ParserInput): Partial<Player> | void {
  const fight = dom.querySelector(
    "#info_php_page > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(1) > nobr > table > tbody > tr:nth-child(1) > td:nth-child(2)"
  );
  const economic = dom.querySelector(
    "#info_php_page > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(1) > nobr > table > tbody > tr:nth-child(2) > td:nth-child(2)"
  );
  const production = dom.querySelector(
    "#info_php_page > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(1) > nobr > table > tbody > tr:nth-child(3) > td:nth-child(2)"
  );

  if (!fight) return;
  if (!economic) return;
  if (!production) return;

  return {
    fightLevel: parseInt(fight.children[0].textContent!),
    fightExp: parseFloat(fight.children[1].textContent!),
    economicLevel: parseInt(economic.children[0].textContent!),
    economicExp: parseFloat(economic.children[1].textContent!),
    productionLevel: parseInt(production.children[0].textContent!),
    productionExp: parseFloat(production.children[1].textContent!),
  };
}

function parseStats({ dom }: ParserInput): Partial<Player> | void {
  const strength = dom.querySelector(
    "#info_php_page > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2)"
  );
  const accuracy = dom.querySelector(
    "#info_php_page > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)"
  );
  const vitality = dom.querySelector(
    "#info_php_page > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2)"
  );
  const stamina = dom.querySelector(
    "#info_php_page > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2)"
  );

  if (!strength) return;
  if (!accuracy) return;
  if (!vitality) return;
  if (!stamina) return;

  return {
    strength: parseInt(strength.childNodes[0].textContent!),
    accuracy: parseInt(accuracy.childNodes[0].textContent!),
    vitality: parseInt(vitality.childNodes[0].textContent!),
    stamina: parseInt(stamina.childNodes[0].textContent!),
  };
}

export function useParseInfo(input: ParserInput) {
  useParseCommon(input);

  const update = (data: Partial<Player>) =>
    usePlayersStore().upsert(input.params!.id as unknown as number, data);

  const subParsers: (({ dom }: ParserInput) => void | Partial<Player>)[] = [
    parseName,
    parseHp,
    parseMoney,
    parseStatus,
    parseLocation,
    parseKarma,
    parseLevels,
    parseStats,
  ];

  for (const subParser of subParsers) {
    let data: Partial<Player> | void;
    if ((data = subParser(input))) {
      update(data);
    }
  }

  usePlayersStore().upsert(input.params!.id as unknown as number, {});
}
