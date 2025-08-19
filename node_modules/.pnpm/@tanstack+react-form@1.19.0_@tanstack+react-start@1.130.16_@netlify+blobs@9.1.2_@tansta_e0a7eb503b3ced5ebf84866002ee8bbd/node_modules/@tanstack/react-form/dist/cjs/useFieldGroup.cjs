"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
const reactStore = require("@tanstack/react-store");
const formCore = require("@tanstack/form-core");
const useIsomorphicLayoutEffect = require("./useIsomorphicLayoutEffect.cjs");
function LocalSubscribe({
  lens,
  selector,
  children
}) {
  const data = reactStore.useStore(lens.store, selector);
  return formCore.functionalUpdate(children, data);
}
function useFieldGroup(opts) {
  const [formLensApi] = react.useState(() => {
    const api = new formCore.FieldGroupApi(opts);
    const form = opts.form instanceof formCore.FieldGroupApi ? opts.form.form : opts.form;
    const extendedApi = api;
    extendedApi.AppForm = function AppForm(appFormProps) {
      return /* @__PURE__ */ jsxRuntime.jsx(form.AppForm, { ...appFormProps });
    };
    extendedApi.AppField = function AppField({ name, ...appFieldProps }) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        form.AppField,
        {
          name: formLensApi.getFormFieldName(name),
          ...appFieldProps
        }
      );
    };
    extendedApi.Field = function Field({ name, ...fieldProps }) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        form.Field,
        {
          name: formLensApi.getFormFieldName(name),
          ...fieldProps
        }
      );
    };
    extendedApi.Subscribe = function Subscribe(props) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        LocalSubscribe,
        {
          lens: formLensApi,
          selector: props.selector,
          children: props.children
        }
      );
    };
    return Object.assign(extendedApi, {
      ...opts.formComponents
    });
  });
  useIsomorphicLayoutEffect.useIsomorphicLayoutEffect(formLensApi.mount, [formLensApi]);
  return formLensApi;
}
exports.useFieldGroup = useFieldGroup;
//# sourceMappingURL=useFieldGroup.cjs.map
