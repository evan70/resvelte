import { c as create_ssr_component, v as validate_component, A as ApplicationLogo } from "../app.js";
import { a as Link_1 } from "./Link-23826b94.js";
const Guest = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `

<div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900"><div>${validate_component(Link_1, "Link").$$render($$result, { href: "/" }, {}, {
    default: () => {
      return `${validate_component(ApplicationLogo, "ApplicationLogo").$$render(
        $$result,
        {
          classes: "w-20 h-20 fill-current text-gray-500"
        },
        {},
        {}
      )}`;
    }
  })}</div>

    <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">${slots.default ? slots.default({}) : ``}</div></div>`;
});
export {
  Guest as G
};
