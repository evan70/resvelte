import { c as create_ssr_component, v as validate_component, B as Button } from "../app.js";
import { G as Guest } from "./Guest-52d259ea.js";
import { F as Form } from "./Form-d468326f.js";
import { F as Field } from "./Field-3f8153c1.js";
import "axios";
import "util";
import "ziggy-js";
import "clsx";
import "./Link-23826b94.js";
const ConfirmPassword = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>Confirm Password</title>`, ""}`, ""}

${validate_component(Guest, "Guest").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="mb-4 text-sm text-gray-600">This is a secure area of the application. Please confirm your password before continuing.
  </div>


  ${validate_component(Form, "Form").$$render($$result, {}, {}, {
        default: ({ form }) => {
          return `${validate_component(Field, "Field").$$render($$result, { name: "password", type: "password" }, {}, {})}
    <div class="flex justify-end">${validate_component(Button, "Button").$$render($$result, { disabled: form.processing }, {}, {
            default: () => {
              return `Confirm`;
            }
          })}</div>`;
        }
      })}`;
    }
  })}`;
});
export {
  ConfirmPassword as default
};
