import { Button } from "@/components/ui/button";

import { useBuilderQuery } from "./use-builder-query";
import { usePreviewForm } from "./preview-form-hook";

export const PreviewForm = () => {
  const { fields } = useBuilderQuery([]);
  const { form } = usePreviewForm();

  if (!fields.length)
    return (
      <div>
        <p className="text-xs uppercase tracking-wider italic text-primary">
          Nothing to preview yet.
        </p>
      </div>
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4 bg-muted/60 rounded-xl p-4"
    >
      {fields.map((item) => {
        switch (item.type) {
          case "checkbox":
            return (
              <form.AppField
                key={item.name}
                name={item.name}
                children={(field) => <field.CheckboxField label={item.label} />}
              />
            );
          case "select":
            return (
              <form.AppField
                key={item.name}
                name={item.name}
                children={(field) => {
                  const options = item.options!.filter(
                    (option) => !option.value.length
                  );
                  return (
                    <field.SelectField
                      options={options?.length ? [] : item.options!}
                      label={item.label}
                    />
                  );
                }}
              />
            );
          case "textarea":
            return (
              <form.AppField
                key={item.name}
                name={item.name}
                children={(field) => (
                  <field.TextAreaField
                    placeholder={item.placeholder}
                    label={item.label}
                  />
                )}
              />
            );
            break;
          default:
            return (
              <form.AppField
                key={item.name}
                name={item.name}
                children={(field) => (
                  <field.TextField
                    type={item.type === "password" ? "password" : "text"}
                    placeholder={item.placeholder}
                    label={item.label}
                  />
                )}
              />
            );
        }
      })}

      {fields.length > 0 && (
        <form.AppForm>
          <form.SubmitButton isSubmitting={false}>Save</form.SubmitButton>
        </form.AppForm>
      )}
    </form>
  );
};
