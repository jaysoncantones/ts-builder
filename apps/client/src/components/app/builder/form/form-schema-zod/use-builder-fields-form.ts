import { useAppForm } from "~/components/custom-form";
import { useBuilderQuery, useBuilderMutation } from "./use-builder-query";
import { Builder, BuilderFields, BuilderDefaults } from "./builder-schema";
import { useCallback, useEffect } from "react";

export const useBuilderFieldsForm = () => {
  const { fields } = useBuilderQuery([]);
  const { mutate, isError } = useBuilderMutation();

  const onChange = useCallback((updates: Builder[]) => {
    mutate({ data: updates, action: "update" });
  }, []);

  const form = useAppForm({
    defaultValues: {
      fields: [BuilderDefaults],
    },
    validators: {
      onChange: BuilderFields,
    },
    // onSubmit: ({ value }) => {
    //   mutate([value]);
    // },
    listeners: {
      onChange: ({ formApi, fieldApi }) => {
        onChange(formApi.state.values.fields!);
        console.log(formApi.state.values.fields!);
      },
    },
  });

  useEffect(() => {
    form.clearFieldValues("fields");
    fields?.map((field) => form.pushFieldValue("fields", field));
  }, [form, fields]);

  return {
    form,
    isError,
  };
};
