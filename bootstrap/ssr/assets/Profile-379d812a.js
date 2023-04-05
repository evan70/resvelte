import { c as create_ssr_component, v as validate_component, e as escape } from "../app.js";
import { I as InertiaDatatable } from "./InertiaDatatable-b4fb8435.js";
import "axios";
import "util";
import "ziggy-js";
import "clsx";
const Profile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
    }
  ];
  if ($$props.users === void 0 && $$bindings.users && users !== void 0)
    $$bindings.users(users);
  return `<button class="mb-5">Plus
</button>

${validate_component(InertiaDatatable, "InertiaDatatable").$$render(
    $$result,
    {
      headers,
      items: users,
      routeName: "profile"
    },
    {},
    {
      default: ({ header, index, row }) => {
        return `${header.value === "index" ? `${escape(index + 1)}` : `${escape(row[header.value])}`}`;
      }
    }
  )}`;
});
export {
  Profile as default
};
