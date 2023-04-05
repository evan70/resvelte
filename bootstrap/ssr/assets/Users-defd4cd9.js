import { c as create_ssr_component, v as validate_component, D as Dialog, i as DialogOverlay, j as createEventDispatcher, r as route$1, B as Button, e as escape } from "../app.js";
import { I as InertiaDatatable } from "./InertiaDatatable-b4fb8435.js";
import { F as Form } from "./Form-d468326f.js";
import { F as Field } from "./Field-3f8153c1.js";
import "axios";
import "util";
import "ziggy-js";
import "clsx";
const Dialog_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isOpen = false;
  const close = () => isOpen = false;
  const open = () => isOpen = true;
  if ($$props.close === void 0 && $$bindings.close && close !== void 0)
    $$bindings.close(close);
  return `${slots.button ? slots.button({ open, close }) : ``}
${isOpen ? `${validate_component(Dialog, "Dialog").$$render($$result, { open: isOpen, static: true }, {}, {
    default: () => {
      return `<div>${validate_component(DialogOverlay, "DialogOverlay").$$render(
        $$result,
        {
          class: "fixed inset-0 bg-black/50 grid place-items-center  z-10  "
        },
        {},
        {}
      )}</div>
    <div class="fixed md:w-120 lt-md:w-90% top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-11 p-6 my-8 text-left align-middle transition-all transform bg-white dark:bg-slate-7 shadow-xl rounded-2xl ">${slots.default ? slots.default({ open, close }) : ``}</div>`;
    }
  })}` : ``}`;
});
const UserForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  } } = $$props;
  const dispatch = createEventDispatcher();
  const config = ({ reset }) => ({
    onSuccess: (page) => {
      console.log(page.props.data.user);
      dispatch("success", page.props.data.user);
      reset();
    }
  });
  if ($$props.initialValues === void 0 && $$bindings.initialValues && initialValues !== void 0)
    $$bindings.initialValues(initialValues);
  return `${validate_component(Form, "Form").$$render(
    $$result,
    {
      config,
      initialValues,
      url: route$1("users.store")
    },
    {},
    {
      default: ({ loading }) => {
        return `<h1 class="font-bold mb-3 ">Create an account</h1>

  ${validate_component(Field, "Field").$$render($$result, { name: "name" }, {}, {})}
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
  ${validate_component(Button, "Button").$$render($$result, { loading }, {}, {
          default: () => {
            return `Create User`;
          }
        })}
  <button class="btn-slate-800 mt-5">Close</button>`;
      }
    }
  )}`;
});
const UpdateUserForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { initialValues } = $$props;
  const dispatch = createEventDispatcher();
  const config = ({ reset }) => ({
    onSuccess: (page) => {
      dispatch("success", page.props.data.user);
      reset();
    }
  });
  if ($$props.initialValues === void 0 && $$bindings.initialValues && initialValues !== void 0)
    $$bindings.initialValues(initialValues);
  return `<div><h1 class="font-bold mb-3 ">Update an account</h1>
  <div><section class="w-100 mx-auto my-5">${validate_component(Form, "Form").$$render(
    $$result,
    {
      config,
      initialValues,
      method: "patch",
      url: route$1("users.update", { user: initialValues.id })
    },
    {},
    {
      default: ({ loading }) => {
        return `${validate_component(Field, "Field").$$render($$result, { name: "name" }, {}, {})}
        ${validate_component(Field, "Field").$$render($$result, { name: "email" }, {}, {})}
        ${validate_component(Button, "Button").$$render($$result, { loading }, {}, {
          default: () => {
            return `Update User`;
          }
        })}
        <button class="btn-slate-800 mt-5">Close</button>`;
      }
    }
  )}</section></div></div>`;
});
const Users = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { users } = $$props;
  let headers = [
    {
      label: "Index",
      value: "index",
      width: "90px",
      align: "center"
    },
    {
      label: "Name",
      value: "name",
      width: "300px",
      sortable: true
    },
    { label: "Email", value: "email" },
    {
      label: "Created At",
      value: "created_at",
      sortable: true,
      format: (created_at) => new Date(created_at).toLocaleString()
    },
    {
      label: "Actions",
      value: "actions",
      align: "center"
    }
  ];
  if ($$props.users === void 0 && $$bindings.users && users !== void 0)
    $$bindings.users(users);
  return `${validate_component(Dialog_1, "VDialog").$$render($$result, {}, {}, {
    button: ({ close, open }) => {
      return `${validate_component(Button, "Button").$$render(
        $$result,
        {
          class: "mb-3",
          color: "btn-light-blue",
          slot: "button"
        },
        {},
        {
          default: () => {
            return `Add User +`;
          }
        }
      )}`;
    },
    default: ({ close, open }) => {
      return `${validate_component(UserForm, "UserForm").$$render($$result, {}, {}, {})}`;
    }
  })}

${validate_component(InertiaDatatable, "InertiaDatatable").$$render(
    $$result,
    {
      headers,
      items: users,
      routeName: "users.index"
    },
    {},
    {
      default: ({ header, index, row, value }) => {
        return `${header.value === "index" ? `${escape(index + 1)}` : `${header.value === "actions" ? `<section class="space-x-2 flex justify-center">${validate_component(Dialog_1, "VDialog").$$render($$result, {}, {}, {
          button: ({ close, open }) => {
            return `${validate_component(Button, "Button").$$render(
              $$result,
              {
                slot: "button",
                color: "btn-light-blue",
                icon: "i-carbon-edit"
              },
              {},
              {}
            )}`;
          },
          default: ({ close, open }) => {
            return `${validate_component(UpdateUserForm, "UpdateUserForm").$$render($$result, { initialValues: row }, {}, {})}`;
          }
        })}
      ${validate_component(Form, "Form").$$render(
          $$result,
          {
            method: "delete",
            url: route("users.destroy", { user: row.id })
          },
          {},
          {
            default: ({ form }) => {
              return `${validate_component(Button, "Button").$$render(
                $$result,
                {
                  color: "btn-light-red",
                  icon: "i-carbon-delete",
                  loading: form.processing
                },
                {},
                {}
              )}`;
            }
          }
        )}</section>` : `${escape(value)}`}`}`;
      }
    }
  )}`;
});
export {
  Users as default
};
