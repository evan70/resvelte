import { c as create_ssr_component, g as getContext, s as subscribe, m as each, b as add_attribute, e as escape, v as validate_component, w as writable, n as derived, j as createEventDispatcher, l as setContext } from "../app.js";
import clsx from "clsx";
import "ziggy-js";
const DatatableFooter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  var _a;
  let nav;
  let $pagination, $$unsubscribe_pagination;
  const { pagination, goToNextPage, goToPrevPage, props, updatePerPage } = getContext("datatable");
  $$unsubscribe_pagination = subscribe(pagination, (value2) => $pagination = value2);
  nav = [
    {
      icon: "i-carbon-arrow-left",
      action: goToPrevPage,
      disabled: $pagination.page === 1
    },
    {
      icon: "i-carbon-arrow-right",
      action: goToNextPage,
      disabled: $pagination.page === $pagination.lastPage
    }
  ];
  $$unsubscribe_pagination();
  return `<footer class="flex justify-between mt-5 ">${Array.isArray((_a = props.perPage) == null ? void 0 : _a.options) ? `<select class="px-2 rounded dark:bg-slate-9">${each(props.perPage.options, (option) => {
    return `<option${add_attribute("value", option, 0)}>${escape(option)}</option>`;
  })}</select>` : ``}

  <div class="flex gap-x-2 items-center"><div class="mx-2">${escape($pagination.from ?? 0)} - ${escape($pagination.to ?? $pagination.total)} of
      ${escape($pagination.total)}</div>
    ${each(nav, (item) => {
    return `<button${add_attribute("class", clsx("rounded bg-slate-2 flex items-center p2 dark:bg-slate-7", item.disabled && "op20 pointer-events-none"), 0)}><i${add_attribute("class", item.icon, 0)}></i>
      </button>`;
  })}</div></footer>`;
});
const DatatableResizableHandler = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="dt-resize-handle absolute top-0 -right-2.7 z-500 cursor-col-resize group-hover:block op50 w-5 h-full"><div class="i-mdi-resize-horizontal"></div></div>`;
});
const DatatableHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $pagination, $$unsubscribe_pagination;
  let { props, pagination, sort } = getContext("datatable");
  $$unsubscribe_pagination = subscribe(pagination, (value2) => $pagination = value2);
  $$unsubscribe_pagination();
  return `<thead><tr>${props.headers.length ? each(props.headers, (header2) => {
    return `<th scope="col"${add_attribute("data-width", header2.width, 0)} class="relative group"><button style="${"text-align: " + escape(header2.align ?? "left", true)}"${add_attribute("class", clsx("relative w-full ", !header2.sortable && "pointer-events-none", header2.align === "center" && "-ml-1"), 0)}>${props.headersResizable ? `${validate_component(DatatableResizableHandler, "DatatableResizableHandler").$$render($$result, {}, {}, {})}` : ``}
      ${escape(header2.label)}
        ${$pagination.sortDirection !== null && $pagination.sortBy === header2.value ? `<div class="absolute inset-0 flex items-center justify-end"><i class="${[
      "i-carbon-arrow-up text-slate-4 dark:text-slate-5",
      ($pagination.sortDirection === "desc" ? "rotate-180" : "") + " " + ($pagination.sortDirection !== "asc" ? "rotate-0" : "")
    ].join(" ").trim()}"></i>
        </div>` : ``}</button>
    </th>`;
  }) : `<th>No headers</th>`}</tr></thead>`;
});
const DatatableBody = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $items, $$unsubscribe_items;
  let { items, props } = getContext("datatable");
  $$unsubscribe_items = subscribe(items, (value2) => $items = value2);
  $$unsubscribe_items();
  return `<tbody>${each($items, (row2, index2) => {
    return `<tr>${each(props.headers, (header2) => {
      return `<td style="${"text-align: " + escape(header2.align ?? "left", true)}">${slots.default ? slots.default({
        row: row2,
        value: header2.format ? header2.format(row2[header2.value]) : row2[header2.value],
        header: header2,
        index: index2
      }) : `
          ${escape(header2.format ? header2.format(row2[header2.value]) : row2[header2.value])}
        `}
      </td>`;
    })}
  </tr>`;
  })}</tbody>`;
});
const useDatatable = (props, dispatch) => {
  var _a;
  const reactiveItems = writable(props.items);
  const perPage = typeof props.perPage === "string" || typeof props.perPage === "number" ? Number(props.perPage) : ((_a = props.perPage) == null ? void 0 : _a.default) ?? 10;
  console.log(perPage);
  const pagination = writable(
    props.pagination ?? {
      page: 1,
      perPage,
      sortBy: "",
      sortDirection: null,
      total: props.items.length,
      from: 1,
      to: 10,
      lastPage: Math.ceil(props.items.length / 10)
    }
  );
  (() => {
    updatePerPage(perPage);
  })();
  const items = derived([pagination, reactiveItems], ($values) => {
    if (props.pagination)
      return $values[1];
    const [pagination2, reactiveItems2] = $values;
    const { page, perPage: perPage2 } = pagination2;
    const start = (page - 1) * perPage2;
    const end = start + perPage2;
    const rows = reactiveItems2.slice(start, end);
    if (pagination2.sortBy && pagination2.sortDirection) {
      return rows.sort(
        (a, b) => {
          if (a[pagination2.sortBy] > b[pagination2.sortBy]) {
            return pagination2.sortDirection === "asc" ? 1 : -1;
          }
          if (a[pagination2.sortBy] < b[pagination2.sortBy]) {
            return pagination2.sortDirection === "asc" ? -1 : 1;
          }
          return 0;
        }
      );
    }
    return rows;
  });
  function goToNextPage() {
    pagination.update((pg) => {
      if (pg.page < Math.ceil(pg.total / pg.perPage)) {
        pg.page += 1;
        pg.from = (pg.page - 1) * pg.perPage + 1;
        pg.to = Math.min(pg.total, pg.page * pg.perPage);
        console.log(pg);
        dispatchPaginationUpdated(pg);
      }
      return pg;
    });
  }
  function dispatchPaginationUpdated(pagination2) {
    if (props.pagination) {
      dispatch("paginationUpdated", pagination2);
    }
  }
  function goToPrevPage() {
    pagination.update((pg) => {
      if (pg.page > 1) {
        pg.page -= 1;
        pg.from = (pg.page - 1) * pg.perPage + 1;
        pg.to = pg.page * pg.perPage;
        dispatchPaginationUpdated(pg);
      }
      return pg;
    });
  }
  function updatePerPage(newPerPage) {
    pagination.update((pg) => {
      pg.perPage = newPerPage;
      pg.page = 1;
      pg.from = 1;
      pg.to = Math.min(pg.total, newPerPage);
      pg.lastPage = Math.ceil(pg.total / newPerPage);
      dispatchPaginationUpdated(pg);
      return pg;
    });
  }
  function updateTotal(newTotal) {
    pagination.update((pg) => {
      pg.total = newTotal;
      pg.lastPage = Math.ceil(newTotal / pg.perPage);
      return pg;
    });
  }
  const sort = (header2) => {
    pagination.update((pg) => {
      if (header2.sortable) {
        if (pg.sortBy === header2.value) {
          pg.sortDirection = pg.sortDirection === null ? "desc" : pg.sortDirection === "desc" ? "asc" : null;
        } else {
          pg.sortBy = header2.value;
          pg.sortDirection = "desc";
        }
      }
      dispatchPaginationUpdated(pg);
      return pg;
    });
  };
  return {
    pagination,
    goToNextPage,
    goToPrevPage,
    updatePerPage,
    sort,
    items,
    reactiveItems,
    updateTotal
  };
};
const Spinner_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ":root{--loader-color:#000}.loader.svelte-f5pohe{text-indent:-9999em;overflow:hidden;width:1em;height:1em;border-radius:50%;margin:0.9em auto;position:relative;-webkit-animation:svelte-f5pohe-load6 1.7s infinite ease;animation:svelte-f5pohe-load6 1.7s infinite ease}@-webkit-keyframes svelte-f5pohe-load6{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg);box-shadow:-0.11em -0.83em 0 -0.4em var(--loader-color), -0.11em -0.83em 0 -0.42em var(--loader-color), -0.11em -0.83em 0 -0.44em var(--loader-color), -0.11em -0.83em 0 -0.46em var(--loader-color), -0.11em -0.83em 0 -0.477em var(--loader-color)}5%,95%{box-shadow:-0.11em -0.83em 0 -0.4em var(--loader-color), -0.11em -0.83em 0 -0.42em var(--loader-color), -0.11em -0.83em 0 -0.44em var(--loader-color), -0.11em -0.83em 0 -0.46em var(--loader-color), -0.11em -0.83em 0 -0.477em var(--loader-color)}30%{box-shadow:-0.11em -0.83em 0 -0.4em var(--loader-color), -0.51em -0.66em 0 -0.42em var(--loader-color), -0.75em -0.36em 0 -0.44em var(--loader-color), -0.83em -0.03em 0 -0.46em var(--loader-color), -0.81em 0.21em 0 -0.477em var(--loader-color)}55%{box-shadow:-0.11em -0.83em 0 -0.4em var(--loader-color), -0.29em -0.78em 0 -0.42em var(--loader-color), -0.43em -0.72em 0 -0.44em var(--loader-color), -0.52em -0.65em 0 -0.46em var(--loader-color), -0.57em -0.61em 0 -0.477em var(--loader-color)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg);box-shadow:-0.11em -0.83em 0 -0.4em var(--loader-color), -0.11em -0.83em 0 -0.42em var(--loader-color), -0.11em -0.83em 0 -0.44em var(--loader-color), -0.11em -0.83em 0 -0.46em var(--loader-color), -0.11em -0.83em 0 -0.477em var(--loader-color)}}@keyframes svelte-f5pohe-load6{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg);box-shadow:-0.11em -0.83em 0 -0.4em var(--loader-color), -0.11em -0.83em 0 -0.42em var(--loader-color), -0.11em -0.83em 0 -0.44em var(--loader-color), -0.11em -0.83em 0 -0.46em var(--loader-color), -0.11em -0.83em 0 -0.477em var(--loader-color)}5%,95%{box-shadow:-0.11em -0.83em 0 -0.4em var(--loader-color), -0.11em -0.83em 0 -0.42em var(--loader-color), -0.11em -0.83em 0 -0.44em var(--loader-color), -0.11em -0.83em 0 -0.46em var(--loader-color), -0.11em -0.83em 0 -0.477em var(--loader-color)}30%{box-shadow:-0.11em -0.83em 0 -0.4em var(--loader-color), -0.51em -0.66em 0 -0.42em var(--loader-color), -0.75em -0.36em 0 -0.44em var(--loader-color), -0.83em -0.03em 0 -0.46em var(--loader-color), -0.81em 0.21em 0 -0.477em var(--loader-color)}55%{box-shadow:-0.11em -0.83em 0 -0.4em var(--loader-color), -0.29em -0.78em 0 -0.42em var(--loader-color), -0.43em -0.72em 0 -0.44em var(--loader-color), -0.52em -0.65em 0 -0.46em var(--loader-color), -0.57em -0.61em 0 -0.477em var(--loader-color)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg);box-shadow:-0.11em -0.83em 0 -0.4em var(--loader-color), -0.11em -0.83em 0 -0.42em var(--loader-color), -0.11em -0.83em 0 -0.44em var(--loader-color), -0.11em -0.83em 0 -0.46em var(--loader-color), -0.11em -0.83em 0 -0.477em var(--loader-color)}}",
  map: null
};
const Spinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 30 } = $$props;
  let { color = "white" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  $$result.css.add(css$1);
  return `<div class="loader svelte-f5pohe" style="${"font-size: " + escape(size, true) + "px; --loader-color: " + escape(color, true) + ";"}">Loading...</div>`;
});
const TableCards = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $items, $$unsubscribe_items;
  let { items, props } = getContext("datatable");
  $$unsubscribe_items = subscribe(items, (value2) => $items = value2);
  $$unsubscribe_items();
  return `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden ">${each($items, (row2, index2) => {
    return `<div class="border border-gray-2 dark:border-slate-7 p-4 rounded space-y-4">${each(props.headers, (header2) => {
      return `<div>${escape(header2.label)} :
          ${slots.default ? slots.default({
        row: row2,
        value: header2.format ? header2.format(row2[header2.value]) : row2[header2.value],
        header: header2,
        index: index2
      }) : `
            ${escape(header2.format ? header2.format(row2[header2.value]) : row2[header2.value])}
          `}
        </div>`;
    })}
    </div>`;
  })}</div>`;
});
const Datatable_svelte_svelte_type_style_lang = "";
const css = {
  code: ".datatable.svelte-1s86ye6 table.svelte-1s86ye6{--at-apply:grid overflow-x-auto text-left relative w-full lt-lg:hidden}.datatable.svelte-1s86ye6 table.svelte-1s86ye6 thead,.datatable.svelte-1s86ye6 table.svelte-1s86ye6 tbody,.datatable.svelte-1s86ye6 table.svelte-1s86ye6 tr{--at-apply:contents}.datatable.svelte-1s86ye6 table.svelte-1s86ye6 th,.datatable.svelte-1s86ye6 table.svelte-1s86ye6 td{--at-apply:border-b border-slate-200 p-3 break-words overflow-hidden dark:border-slate-7}.datatable.svelte-1s86ye6 table.svelte-1s86ye6 th{--at-apply:border-t border-r }.datatable.svelte-1s86ye6 table.svelte-1s86ye6 th:first-child{--at-apply:border-l }.datatable.svelte-1s86ye6 table.svelte-1s86ye6 td{--at-apply:border-r }.datatable.svelte-1s86ye6 table.svelte-1s86ye6 td:first-child{--at-apply:border-l }",
  map: null
};
const Datatable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { headers } = $$props;
  let { items } = $$props;
  let { noWrap } = $$props;
  let { loading } = $$props;
  let { headersDraggable } = $$props;
  let { headersResizable } = $$props;
  let { pagination = {} } = $$props;
  let { perPage } = $$props;
  const dispatch = createEventDispatcher();
  const datatable = useDatatable($$props, dispatch);
  setContext("datatable", { ...datatable, props: $$props });
  if ($$props.headers === void 0 && $$bindings.headers && headers !== void 0)
    $$bindings.headers(headers);
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.noWrap === void 0 && $$bindings.noWrap && noWrap !== void 0)
    $$bindings.noWrap(noWrap);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  if ($$props.headersDraggable === void 0 && $$bindings.headersDraggable && headersDraggable !== void 0)
    $$bindings.headersDraggable(headersDraggable);
  if ($$props.headersResizable === void 0 && $$bindings.headersResizable && headersResizable !== void 0)
    $$bindings.headersResizable(headersResizable);
  if ($$props.pagination === void 0 && $$bindings.pagination && pagination !== void 0)
    $$bindings.pagination(pagination);
  if ($$props.perPage === void 0 && $$bindings.perPage && perPage !== void 0)
    $$bindings.perPage(perPage);
  $$result.css.add(css);
  {
    {
      datatable.reactiveItems.update(() => items);
      datatable.updateTotal((pagination == null ? void 0 : pagination.total) ?? items.length);
    }
  }
  return `<div class="datatable svelte-1s86ye6">${validate_component(TableCards, "TableCards").$$render($$result, {}, {}, {
    default: () => {
      return `${slots.default ? slots.default({
        header,
        index,
        perPage: "4",
        row,
        slot: "default",
        value
      }) : `
      ${escape(value)}
    `}`;
    }
  })}
  <table class="svelte-1s86ye6">${loading ? `<div class="absolute inset-0 bg-transparent dark:bg-slate-8/50 flex justify-center items-center z-50"><div>${validate_component(Spinner, "Spinner").$$render($$result, { color: "black" }, {}, {})}</div></div>` : ``}
    ${validate_component(DatatableHeader, "DatatableHeader").$$render($$result, {}, {}, {})}
    ${validate_component(DatatableBody, "DatatableBody").$$render($$result, {}, {}, {
    default: () => {
      return `${slots.default ? slots.default({
        header,
        index,
        perPage: "4",
        row,
        slot: "default",
        value
      }) : `
        ${escape(value)}
      `}`;
    }
  })}</table>
  ${items.length ? `${validate_component(DatatableFooter, "DatatableFooter").$$render($$result, {}, {}, {})}` : `<div class="p-4 text-center text-slate-500 dark:text-slate-400">No data available
    </div>`}

</div>`;
});
const InertiaDatatable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { items } = $$props;
  let loading = false;
  let { headers } = $$props;
  let { routeName } = $$props;
  let pagination = {};
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.headers === void 0 && $$bindings.headers && headers !== void 0)
    $$bindings.headers(headers);
  if ($$props.routeName === void 0 && $$bindings.routeName && routeName !== void 0)
    $$bindings.routeName(routeName);
  return `${validate_component(Datatable, "Datatable").$$render(
    $$result,
    {
      headers,
      items: items.data,
      loading,
      noWrap: true,
      pagination,
      perPage: {
        default: 10,
        options: [4, 10, 20, 30, 40, 50]
      }
    },
    {},
    {
      default: ({ header: header2, index: index2, row: row2 }) => {
        return `${slots.default ? slots.default({
          header: header2,
          index: index2,
          row: row2,
          slot: "default",
          value
        }) : `

    ${escape(value)}
  `}`;
      }
    }
  )}`;
});
export {
  InertiaDatatable as I
};
