import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";

// clean up

// @ts-ignore
// cSpell:ignore hpupdate
window.hpupdate = () => {};
Array.from(window.document.styleSheets)
  .slice(0, 3)
  .forEach((ss) => {
    ss.disabled = true;
  });
var body = window.document.body;
while (body.attributes.length > 0) {
  body.removeAttribute(body.attributes[0].name);
}
const oldBody = body.innerHTML;
body.innerHTML = ``;

// seed the universe

const pinia = createPinia();
const app = createApp(App, {
  oldBody,
});
app.use(pinia);
app.mount(
  (() => {
    const app = document.createElement("div");
    document.body.append(app);
    return app;
  })()
);
