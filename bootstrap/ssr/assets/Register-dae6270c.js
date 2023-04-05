import { c as create_ssr_component, v as validate_component, B as Button } from "../app.js";
import { G as Guest } from "./Guest-52d259ea.js";
import { F as Form } from "./Form-d468326f.js";
import { F as Field } from "./Field-3f8153c1.js";
import "axios";
import "util";
import "ziggy-js";
import "clsx";
import "./Link-23826b94.js";
const Register = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>Register</title>`, ""}`, ""}

${validate_component(Guest, "Guest").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Form, "Form").$$render(
        $$result,
        {
          initialValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: ""
          }
        },
        {},
        {
          default: ({ form }) => {
            return `${validate_component(Field, "Field").$$render($$result, { name: "name" }, {}, {})}
    ${validate_component(Field, "Field").$$render($$result, { name: "email" }, {}, {})}
    ${validate_component(Field, "Field").$$render($$result, { name: "password", type: "password" }, {}, {})}
    ${validate_component(Field, "Field").$$render(
              $$result,
              {
                name: "password_confirmation",
                type: "password"
              },
              {},
              {}
            )}
    <div class="flex items-center justify-end mt-4"><a class="underline text-sm text-gray-600 hover:text-gray-900" href="/login">Already registered?
      </a>

      ${validate_component(Button, "Button").$$render($$result, { class: "ml-4", disabled: form.processing }, {}, {
              default: () => {
                return `Register
      `;
              }
            })}</div>`;
          }
        }
      )}`;
    }
  })}`;
});
export {
  Register as default
};
