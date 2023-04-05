import { c as create_ssr_component, a as compute_rest_props, g as getContext, s as subscribe, b as add_attribute, e as escape, d as spread, f as escape_object, h as escape_attribute_value } from "../app.js";
function useInput({ name, label }) {
  let computedLabel = label ?? (name == null ? void 0 : name.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()).replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase()));
  let computedName = name ?? (label == null ? void 0 : label.replace(/ /g, "_").toLowerCase());
  let id = Math.random().toString(36).substr(2, 9);
  return { computedName, computedLabel, id };
}
const Field = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let error;
  let disabled;
  let $$restProps = compute_rest_props($$props, ["name", "label"]);
  let $form, $$unsubscribe_form;
  let { name } = $$props;
  let { label = null } = $$props;
  const form = getContext("form");
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  let { computedName, computedLabel, id } = useInput($$props);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  error = $form.errors[computedName];
  disabled = $$restProps.disabled;
  $$unsubscribe_form();
  return `<div class="${["my-5 dark:text-slate-3", disabled ? "op50" : ""].join(" ").trim()}"><label class="mb-2 block"${add_attribute("for", id, 0)}>${escape(computedLabel)}</label>
  <input${spread(
    [
      escape_object($$restProps),
      {
        class: "w-full border rounded outline-none py-2 px-2 dark:bg-slate-8 dark:border-slate-7 dark:text-slate-3 "
      },
      { id: escape_attribute_value(id) },
      {
        name: escape_attribute_value(computedName)
      }
    ],
    {}
  )}${add_attribute("value", $form[computedName], 0)}>
  ${error ? `<span class="text-red-5 text-xs block mt-1">${escape(error)}</span>` : ``}</div>`;
});
export {
  Field as F,
  useInput as u
};
