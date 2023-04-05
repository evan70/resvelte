import { c as create_ssr_component, v as validate_component, r as route, B as Button } from "../app.js";
import { L as Link } from "./Link-23826b94.js";
import { G as Guest } from "./Guest-52d259ea.js";
import { F as Form } from "./Form-d468326f.js";
import "axios";
import "util";
import "ziggy-js";
import "clsx";
const VerifyEmail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let verificationLinkSent;
  let { status } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  verificationLinkSent = status === "verification-link-sent";
  return `${$$result.head += `${$$result.title = `<title>Email Verification</title>`, ""}`, ""}

${validate_component(Guest, "Guest").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="mb-4 text-sm text-gray-600">Thanks for signing up! Before getting started, could you verify your email address by clicking
    on the link we just emailed to you? If you didn&#39;t receive the email, we will gladly send you
    another.
  </div>

  ${verificationLinkSent ? `<div class="mb-4 font-medium text-sm text-green-600">A new verification link has been sent to the email address you provided during registration.
    </div>` : ``}

  ${validate_component(Form, "Form").$$render(
        $$result,
        {
          as: true,
          class: "flex justify-between items-center mt-10",
          url: route("verification.send")
        },
        {},
        {
          default: ({ form }) => {
            return `${validate_component(Link, "Link").$$render(
              $$result,
              {
                as: "button",
                class: "underline text-sm text-gray-600 hover:text-gray-900",
                href: route("logout"),
                method: "post"
              },
              {},
              {
                default: () => {
                  return `Log Out
    `;
                }
              }
            )}
    ${validate_component(Button, "Button").$$render($$result, { disabled: form.processing }, {}, {
              default: () => {
                return `Resend Verification Email
    `;
              }
            })}`;
          }
        }
      )}`;
    }
  })}`;
});
export {
  VerifyEmail as default
};
