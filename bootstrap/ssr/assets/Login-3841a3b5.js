import { c as create_ssr_component, a as compute_rest_props, g as getContext, s as subscribe, b as add_attribute, d as spread, f as escape_object, h as escape_attribute_value, e as escape, v as validate_component, r as route, B as Button } from "../app.js";
import { u as useInput, F as Field } from "./Field-3f8153c1.js";
import clsx from "clsx";
import { G as Guest } from "./Guest-52d259ea.js";
import { F as Form } from "./Form-d468326f.js";
import { L as Link } from "./Link-23826b94.js";
import "axios";
import "util";
import "ziggy-js";
const Checkbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let disabled;
  let checked;
  let $$restProps = compute_rest_props($$props, ["name", "label"]);
  let $form, $$unsubscribe_form;
  let randomId = Math.random().toString(36).substring(2, 9);
  let { name } = $$props;
  let { label } = $$props;
  let { computedName, computedLabel, id } = useInput($$props);
  const form = getContext("form");
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  disabled = $$restProps.disabled;
  checked = $form[computedName];
  $$unsubscribe_form();
  return `<label${add_attribute("class", clsx("flex gap-x-3 items-center dark:text-slate-3 cursor-pointer", disabled && "op-50 pointer-events-none"), 0)}${add_attribute("for", randomId, 0)}><input${spread(
    [
      escape_object($$restProps),
      { class: "opacity-0 absolute peer" },
      { id: escape_attribute_value(randomId) },
      {
        name: escape_attribute_value(computedName)
      },
      { type: "checkbox" }
    ],
    {}
  )}${add_attribute("checked", $form[computedName], 1)}>

  <span${add_attribute("class", clsx("block h-5 w-5 peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:dark:ring-indigo-9 dark:border-slate-6 border flex-shrink-0 flex items-center justify-center transition duration-200 ease-[cubic-bezier(0.4, 0, 0.2, 1)] rounded", !checked && !disabled && "border-gray-300", checked && !disabled && "bg-primary  border-primary", disabled && "bg-gray-200 dark:bg-gray-9  border-gray-200 "), 0)}><i class="${"i-bx-check text-white transition duration-150 delay-100 ease-[cubic-bezier(0.57, 1.48, 0.87, 1.09] " + escape(checked ? "scale-full" : " scale-0", true)}"></i></span>
  <span class="text-sm">${escape(computedLabel)}</span></label>`;
});
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { canResetPassword } = $$props;
  let { status } = $$props;
  if ($$props.canResetPassword === void 0 && $$bindings.canResetPassword && canResetPassword !== void 0)
    $$bindings.canResetPassword(canResetPassword);
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  return `${$$result.head += `${$$result.title = `<title>Log in</title>`, ""}`, ""}

${validate_component(Guest, "Guest").$$render($$result, {}, {}, {
    default: () => {
      return `${status ? `<div class="mb-4 font-medium text-sm text-green-600">${escape(status)}</div>` : ``}
  ${validate_component(Form, "Form").$$render(
        $$result,
        {
          initialValues: {
            email: null,
            password: null,
            remember: false
          },
          url: route("login")
        },
        {},
        {
          default: ({ form }) => {
            return `${validate_component(Field, "Field").$$render($$result, { autofocus: true, name: "email" }, {}, {})}
    ${validate_component(Field, "Field").$$render($$result, { name: "password", type: "password" }, {}, {})}
    <div class="flex justify-between items-center mb-7">${validate_component(Checkbox, "Checkbox").$$render($$result, { name: "remember" }, {}, {})}
      <div>${canResetPassword ? `${validate_component(Link, "Link").$$render(
              $$result,
              {
                class: "text-blue-500  text-sm",
                href: route("password.request")
              },
              {},
              {
                default: () => {
                  return `Forgot Password ?`;
                }
              }
            )}` : ``}</div></div>
    ${validate_component(Button, "Button").$$render(
              $$result,
              {
                class: "!w-full !bg-blue-600",
                loading: form.processing
              },
              {},
              {
                default: () => {
                  return `Login`;
                }
              }
            )}`;
          }
        }
      )}`;
    }
  })}`;
});
export {
  Login as default
};
