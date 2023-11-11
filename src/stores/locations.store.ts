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
    ])
  );

  const get = (x: Location["x"], y: Location["y"]) =>
    locations.get(`${x}-${y}`) as Location;

  return { get };
});
