import { c as create_ssr_component, v as validate_component, B as Button } from "../app.js";
import { F as Form } from "./Form-d468326f.js";
import { F as Field } from "./Field-3f8153c1.js";
import { G as Guest } from "./Guest-52d259ea.js";
import "axios";
import "util";
import "ziggy-js";
import "clsx";
import "./Link-23826b94.js";
const ResetPassword = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { email } = $$props;
  let { token } = $$props;
  if ($$props.email === void 0 && $$bindings.email && email !== void 0)
    $$bindings.email(email);
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  return `${$$result.head += `${$$result.title = `<title>Reset Password</title>`, ""}`, ""}

${validate_component(Guest, "Guest").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Form, "Form").$$render(
        $$result,
        {
          initialValues: {
            token,
            email,
            password: null,
            password_confirmation: null
          },
          url: "/password-reset"
        },
        {},
        {
          default: ({ form }) => {
            return `${validate_component(Field, "Field").$$render(
              $$result,
              {
                disabled: true,
                name: "token",
                value: token
              },
              {},
              {}
            )}
    ${validate_component(Field, "Field").$$render($$result, { disabled: true, name: "email" }, {}, {})}
    ${validate_component(Field, "Field").$$render($$result, { name: "password", type: "password" }, {}, {})}
    ${validate_component(Field, "Field").$$render(
              $$result,
              {
                label: "Confirm Password",
                name: "password_confirmation",
                type: "password"
              },
              {},
              {}
            )}
    ${validate_component(Button, "Button").$$render($$result, { loading: form.processing }, {}, {
              default: () => {
                return `Reset Password`;
              }
            })}`;
          }
        }
      )}`;
    }
  })}`;
});
export {
  ResetPassword as default
};
