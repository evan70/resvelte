import { c as create_ssr_component, v as validate_component, r as route, e as escape } from "../app.js";
import { a as Link_1 } from "./Link-23826b94.js";
import "axios";
import "util";
import "ziggy-js";
import "clsx";
const Welcome_svelte_svelte_type_style_lang = "";
const css = {
  code: "p.svelte-7xdp3d{@apply text-center border border-gray-5 rounded-lg p-4 border-dashed ;}",
  map: null
};
const Welcome = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { app } = $$props;
  let { auth } = $$props;
  if ($$props.app === void 0 && $$bindings.app && app !== void 0)
    $$bindings.app(app);
  if ($$props.auth === void 0 && $$bindings.auth && auth !== void 0)
    $$bindings.auth(auth);
  $$result.css.add(css);
  return `<div class="min-h-screen min-w-screen grid place-items-center "><div><div class="space-x-3 flex justify-end mb-4">${!auth ? `${validate_component(Link_1, "Link").$$render($$result, { href: route("login") }, {}, {
    default: () => {
      return `Login`;
    }
  })}
        ${validate_component(Link_1, "Link").$$render($$result, { href: route("register") }, {}, {
    default: () => {
      return `Register`;
    }
  })}` : `${validate_component(Link_1, "Link").$$render($$result, { href: route("dashboard") }, {}, {
    default: () => {
      return `Dashboard`;
    }
  })}`}</div>

    <div class="bg-white dark:bg-slate-8 rounded-lg p10 space-y-3"><div class="text-5xl text-center">responsive🔥sk</div>
      <h1 class="text-2xl font-bold">Laravel ${escape(app.laravel)} + Vite + Svelte + Inertia + Unocss</h1>
      <div class="grid grid-cols-2 gap-3 pt-8 dark:text-slate-2"><p class="svelte-7xdp3d">Laravel: ${escape(app.laravel)}</p>
        <p class="svelte-7xdp3d">PHP: ${escape(app.php)}</p>
        <p class="svelte-7xdp3d">Name: ${escape(app.name)}</p>
        <p class="svelte-7xdp3d">Env: ${escape(app.env)}</p>
        <p class="svelte-7xdp3d">Debug: ${escape(app.debug)}</p>
        <p class="svelte-7xdp3d">URL: ${escape(app.url)}</p></div></div></div>

</div>`;
});
export {
  Welcome as default
};
