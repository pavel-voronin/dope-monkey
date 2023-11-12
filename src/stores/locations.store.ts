// cSpell:ignore Katenian

import { defineStore } from "pinia";
import { reactive } from "vue";

export type Location = {
  x: number;
  y: number;
  name: string;
};

export const useLocationsStore = defineStore("locations", () => {
  const locations = reactive<
    Map<`${Location["x"]}-${Location["y"]}`, Location>
  >(
    new Map([
      ["50-50", { x: 50, y: 50, name: "[G] Ganja City Downtown" }],
      ["51-51", { x: 51, y: 51, name: "[G] China-Town" }],
      ["149-149", { x: 149, y: 149, name: "[Z] Power Lost" }],
      ["149-150", { x: 149, y: 150, name: "[Z] Katenian" }],
    ])
  );

  function get(link: string): Location;
  function get(x: Location["x"], y?: Location["y"]): Location;
  function get(x: Location["x"] | string, y?: Location["y"]): Location {
    if (typeof x === "string") {
      const match = x.match(/\/map\.php\?sx=(\d+)&sy=(\d+)/);

      if (!match) throw new Error("Invalid location link"); // todo handle

      x = parseInt(match[1]);
      y = parseInt(match[2]);
    } else if (typeof y === "undefined") {
      throw new Error("Invalid location coordinates");
    }

    return locations.get(`${x}-${y}`) as Location;
  }

  return { get };
});
