import { Component, markRaw } from "vue";
import { useParseMe } from "../composables/useParseMe";
import MePage from "../components/pages/MePage.vue";
import { useAppStore } from "../stores/app.store";
import { GM_fetch } from "../fetch";
import { useParseInfo } from "./useParseInfo";
import InfoPage from "../components/pages/InfoPage.vue";

export type ParserInput = {
  dom: Document;
  src: string;
  params?: Record<string, string | number>;
};

export type Route = {
  parser: (input: ParserInput) => void;
  component: Component;
  fetcher: (
    route: string,
    params?: Record<string, string | number>
  ) => Promise<string>;
};

const getFetcher = async (
  route: string,
  params?: Record<string, string | number>
) => {
  if (params) {
    route +=
      "?" + new URLSearchParams(params as Record<string, string>).toString();
  }

  const response = await GM_fetch(route);
  const decoder = new TextDecoder("windows-1251");
  const text = decoder.decode(await response.arrayBuffer());

  return text;
};

const routes: Record<string, Route> = {
  "/me.php": {
    fetcher: getFetcher,
    parser: useParseMe,
    component: markRaw(MePage),
  },
  "/info.php": {
    fetcher: getFetcher,
    parser: useParseInfo,
    component: markRaw(InfoPage),
  },
};

async function useRouter(
  location: string,
  params?: Record<string, string | number> | string
): Promise<void>;
async function useRouter(route: Location, src?: string): Promise<void>;
async function useRouter(
  location: string | Location,
  paramsOrSrc?: Record<string, string | number> | string,
  src?: string
): Promise<void> {
  // init args

  src = src ?? (typeof paramsOrSrc === "string" ? paramsOrSrc : undefined);
  let params = typeof paramsOrSrc === "object" ? paramsOrSrc : undefined;

  if (location instanceof Location) {
    if (params === undefined) {
      params = {};
      new URLSearchParams(location.search).forEach((value, key) => {
        params![key] = value;
      });
    }

    location = location.pathname;
  }

  if (!(location in routes)) throw new Error(`Route ${location} not found`); // todo handle
  const route = routes[location];

  // launch fetcher

  if (src === undefined) {
    src = await route.fetcher(location, params);
  }

  // launch parser

  const dom = new DOMParser().parseFromString(src, "text/html");
  route.parser({ dom, src, params });

  // change current page and props

  useAppStore().currentRoute = { component: route.component, props: params! };
}

export { useRouter };
