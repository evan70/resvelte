import { c as create_ssr_component, e as escape } from "../app.js";
import "axios";
import "util";
import "ziggy-js";
import "clsx";
const Dashboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { auth } = $$props;
  if ($$props.auth === void 0 && $$bindings.auth && auth !== void 0)
    $$bindings.auth(auth);
  return `${$$result.head += `${$$result.title = `<title>Dashboard</title>`, ""}`, ""}

<div class="flex flex-col gap-y-4 justify-center items-center"><h2>Welcome , ${escape(auth.name)}</h2>
  <p class="bg-green/20 text-green-500 inline-block rounded p1 text-sm px-3">${escape(auth.email)}</p></div>`;
});
export {
  Dashboard as default
};
