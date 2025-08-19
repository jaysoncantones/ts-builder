import { useEffect } from "react";

import { useAppForm } from "~/components/custom-form";
import { useBuilderQuery } from "./use-builder-query";

export const usePreviewForm = () => {
  const { fields, fieldsZodSchema } = useBuilderQuery([]);

  const form = useAppForm({
    validators: {
      onChange: fieldsZodSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
    listeners: {
      onChange: ({ formApi, fieldApi }) => {
        // console.log(formApi.state.values, " formApi.state.values");
        // console.log(formApi.state.values);
      },
    },
  });

  useEffect(() => {
    form.reset();
    fields.map((field) => form.setFieldValue(field.name, ""));
    form.update;
  }, [form, fields, fieldsZodSchema]);

  return {
    form,
  };
};
