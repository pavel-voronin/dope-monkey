import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import monkey, { cdn, util } from "vite-plugin-monkey";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [util.unimportPreset],
    }),
    monkey({
      entry: "src/main.ts",
      userscript: {
        icon: "https://vitejs.dev/logo.svg",
        namespace: "npm/vite-plugin-monkey",
        match: ["https://www.gwars.io/*"],
      },
      build: {
        externalGlobals: {
          vue: cdn
            .jsdelivr("Vue", "dist/vue.global.prod.js")
            .concat(
              cdn.jsdelivr("", "lib/index.iife.js")[1]("latest", "vue-demi")
            )
            .concat(
              await util.fn2dataUrl(() => {
                // @ts-ignore
                window.Vue = Vue; // work with element-plus
              })
            ),
          pinia: cdn.jsdelivr("Pinia", "dist/pinia.iife.prod.js"),
        },
      },
    }),
  ],
});
