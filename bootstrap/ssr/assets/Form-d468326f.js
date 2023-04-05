import { O as Oe, w as writable, k as isEqual, c as create_ssr_component, a as compute_rest_props, s as subscribe, l as setContext, j as createEventDispatcher, d as spread, f as escape_object } from "../app.js";
function useForm(...args) {
  const rememberKey = typeof args[0] === "string" ? args[0] : null;
  const data = (typeof args[0] === "string" ? args[1] : args[0]) || {};
  const restored = rememberKey ? Oe.restore(rememberKey) : null;
  let defaults = data;
  let cancelToken = null;
  let recentlySuccessfulTimeoutId = null;
  let transform = (data2) => data2;
  const store = writable({
    ...restored ? restored.data : data,
    isDirty: false,
    errors: restored ? restored.errors : {},
    hasErrors: false,
    progress: null,
    wasSuccessful: false,
    recentlySuccessful: false,
    processing: false,
    setStore(key, value) {
      store.update((store2) => {
        return Object.assign({}, store2, typeof key === "string" ? { [key]: value } : key);
      });
    },
    data() {
      return Object.keys(data).reduce((carry, key) => {
        carry[key] = this[key];
        return carry;
      }, {});
    },
    transform(callback) {
      transform = callback;
      return this;
    },
    defaults(key, value) {
      if (typeof key === "undefined") {
        defaults = Object.assign(defaults, this.data());
        return this;
      }
      defaults = Object.assign(defaults, value ? { [key]: value } : key);
      return this;
    },
    reset(...fields) {
      if (fields.length === 0) {
        this.setStore(defaults);
      } else {
        this.setStore(
          Object.keys(defaults).filter((key) => fields.includes(key)).reduce((carry, key) => {
            carry[key] = defaults[key];
            return carry;
          }, {})
        );
      }
      return this;
    },
    setError(key, value) {
      this.setStore("errors", {
        ...this.errors,
        ...value ? { [key]: value } : key
      });
      return this;
    },
    clearErrors(...fields) {
      this.setStore(
        "errors",
        Object.keys(this.errors).reduce(
          (carry, field) => ({
            ...carry,
            ...fields.length > 0 && !fields.includes(field) ? { [field]: this.errors[field] } : {}
          }),
          {}
        )
      );
      return this;
    },
    submit(method, url, options = {}) {
      const data2 = transform(this.data());
      const _options = {
        ...options,
        onCancelToken: (token) => {
          cancelToken = token;
          if (options.onCancelToken) {
            return options.onCancelToken(token);
          }
        },
        onBefore: (visit) => {
          this.setStore("wasSuccessful", false);
          this.setStore("recentlySuccessful", false);
          clearTimeout(recentlySuccessfulTimeoutId);
          if (options.onBefore) {
            return options.onBefore(visit);
          }
        },
        onStart: (visit) => {
          this.setStore("processing", true);
          if (options.onStart) {
            return options.onStart(visit);
          }
        },
        onProgress: (event) => {
          this.setStore("progress", event);
          if (options.onProgress) {
            return options.onProgress(event);
          }
        },
        onSuccess: async (page) => {
          this.setStore("processing", false);
          this.setStore("progress", null);
          this.clearErrors();
          this.setStore("wasSuccessful", true);
          this.setStore("recentlySuccessful", true);
          recentlySuccessfulTimeoutId = setTimeout(() => this.setStore("recentlySuccessful", false), 2e3);
          if (options.onSuccess) {
            return options.onSuccess(page);
          }
        },
        onError: (errors) => {
          this.setStore("processing", false);
          this.setStore("progress", null);
          this.clearErrors().setError(errors);
          if (options.onError) {
            return options.onError(errors);
          }
        },
        onCancel: () => {
          this.setStore("processing", false);
          this.setStore("progress", null);
          if (options.onCancel) {
            return options.onCancel();
          }
        },
        onFinish: () => {
          this.setStore("processing", false);
          this.setStore("progress", null);
          cancelToken = null;
          if (options.onFinish) {
            return options.onFinish();
          }
        }
      };
      if (method === "delete") {
        Oe.delete(url, { ..._options, data: data2 });
      } else {
        Oe[method](url, data2, _options);
      }
    },
    get(url, options) {
      this.submit("get", url, options);
    },
    post(url, options) {
      this.submit("post", url, options);
    },
    put(url, options) {
      this.submit("put", url, options);
    },
    patch(url, options) {
      this.submit("patch", url, options);
    },
    delete(url, options) {
      this.submit("delete", url, options);
    },
    cancel() {
      if (cancelToken) {
        cancelToken.cancel();
      }
    }
  });
  store.subscribe((form) => {
    if (form.isDirty === isEqual(form.data(), defaults)) {
      form.setStore("isDirty", !form.isDirty);
    }
    const hasErrors = Object.keys(form.errors).length > 0;
    if (form.hasErrors !== hasErrors) {
      form.setStore("hasErrors", !form.hasErrors);
    }
    if (rememberKey) {
      Oe.remember({ data: form.data(), errors: form.errors }, rememberKey);
    }
  });
  return store;
}
const Form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["initialValues", "url", "method", "config", "useAxios"]);
  let $form, $$unsubscribe_form;
  let { initialValues = {} } = $$props;
  let { url = "" } = $$props;
  let { method = "post" } = $$props;
  let { config = (form2) => ({}) } = $$props;
  let { useAxios = false } = $$props;
  let form = useForm(initialValues);
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  setContext("form", form);
  createEventDispatcher();
  if ($$props.initialValues === void 0 && $$bindings.initialValues && initialValues !== void 0)
    $$bindings.initialValues(initialValues);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.method === void 0 && $$bindings.method && method !== void 0)
    $$bindings.method(method);
  if ($$props.config === void 0 && $$bindings.config && config !== void 0)
    $$bindings.config(config);
  if ($$props.useAxios === void 0 && $$bindings.useAxios && useAxios !== void 0)
    $$bindings.useAxios(useAxios);
  $$unsubscribe_form();
  return `<form${spread([escape_object($$restProps), { method: "POST" }], {})}>${slots.default ? slots.default({ form: $form, loading: $form.processing }) : ``}</form>`;
});
export {
  Form as F
};
