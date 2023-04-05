import { c as create_ssr_component, a as compute_rest_props, d as spread, f as escape_object, o as is_void, v as validate_component } from "../app.js";
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "href",
    "as",
    "data",
    "method",
    "replace",
    "preserveScroll",
    "preserveState",
    "only",
    "headers",
    "queryStringArrayFormat"
  ]);
  let { href } = $$props;
  let { as = "a" } = $$props;
  let { data = {} } = $$props;
  let { method = "get" } = $$props;
  let { replace = false } = $$props;
  let { preserveScroll = false } = $$props;
  let { preserveState = null } = $$props;
  let { only = [] } = $$props;
  let { headers = {} } = $$props;
  let { queryStringArrayFormat = "brackets" } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.method === void 0 && $$bindings.method && method !== void 0)
    $$bindings.method(method);
  if ($$props.replace === void 0 && $$bindings.replace && replace !== void 0)
    $$bindings.replace(replace);
  if ($$props.preserveScroll === void 0 && $$bindings.preserveScroll && preserveScroll !== void 0)
    $$bindings.preserveScroll(preserveScroll);
  if ($$props.preserveState === void 0 && $$bindings.preserveState && preserveState !== void 0)
    $$bindings.preserveState(preserveState);
  if ($$props.only === void 0 && $$bindings.only && only !== void 0)
    $$bindings.only(only);
  if ($$props.headers === void 0 && $$bindings.headers && headers !== void 0)
    $$bindings.headers(headers);
  if ($$props.queryStringArrayFormat === void 0 && $$bindings.queryStringArrayFormat && queryStringArrayFormat !== void 0)
    $$bindings.queryStringArrayFormat(queryStringArrayFormat);
  return `${((tag) => {
    return tag ? `<${as}${spread([escape_object(as === "a" ? { href } : {}), escape_object($$restProps)], {})}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(as)}`;
});
const Link_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { href = null, active = false } = $$props;
  const classes = active ? "inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 dark:border-indigo-600 text-sm font-medium leading-5 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out" : "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 transition duration-150 ease-in-out";
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  return `${validate_component(Link, "Link").$$render($$result, { href, class: classes }, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}




`;
});
export {
  Link as L,
  Link_1 as a
};
