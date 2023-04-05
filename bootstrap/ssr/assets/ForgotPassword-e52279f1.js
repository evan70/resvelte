import { c as create_ssr_component, v as validate_component, e as escape, r as route, B as Button } from "../app.js";
import { F as Field } from "./Field-3f8153c1.js";
import { F as Form } from "./Form-d468326f.js";
import { G as Guest } from "./Guest-52d259ea.js";
import "axios";
import "util";
import "ziggy-js";
import "clsx";
import "./Link-23826b94.js";
const ForgotPassword = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  return `${$$result.head += `${$$result.title = `<title>Forgot Password</title>`, ""}`, ""}

${validate_component(Guest, "Guest").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="mb-4 text-sm ">Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
  </div>

  ${status ? `<div class="mb-4 font-medium text-sm text-green-600">${escape(status)}</div>` : ``}

  ${validate_component(Form, "Form").$$render(
        $$result,
        {
          initialValues: { email: null },
          url: route("password.email")
        },
        {},
        {
          default: ({ form }) => {
            return `${validate_component(Field, "Field").$$render($$result, { autofocus: true, name: "email" }, {}, {})}
    <div class="text-right">${validate_component(Button, "Button").$$render($$result, { loading: form.processing }, {}, {
              default: () => {
                return `Email Password Reset Link`;
              }
            })}</div>`;
          }
        }
      )}`;
    }
  })}`;
});
export {
  ForgotPassword as default
};
