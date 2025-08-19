import { useCallback } from "react";

import { BuilderFieldsForm } from "./builder-form-fields";
import { Fields, BuilderDefaults } from "./builder-schema";
import { useBuilderQuery, useBuilderMutation } from "./use-builder-query";

export const BuilderForm = () => {
  const { fields } = useBuilderQuery([]);
  const { mutate } = useBuilderMutation();

  const handleAddTo = useCallback(
    (type: Fields) => {
      mutate({
        data: [
          {
            ...BuilderDefaults,
            type,
            options:
              type === "select"
                ? [{ label: "option_1", value: "Option_1" }]
                : undefined,
            id: `field_${fields!.length + 1}`,
            name: `field_${fields!.length + 1}`,
            label: `${type}_${fields!.length + 1}`,
          },
        ],
      });
    },
    [fields]
  );

  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <h2 className="uppercase tracking-wider text-sm">Fields</h2>
        <div className="flex gap-4 flex-wrap mt-2">
          {Fields.map((item, index) => (
            <span
              key={index}
              onClick={() => handleAddTo(item.value)}
              className="bg-primary text-accent dark:text-white uppercase tracking-wider text-xs rounded-sm py-1.5 px-4 cursor-pointer"
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <br />
      <div className="w-full flex flex-col gap-2">
        <h2 className="uppercase tracking-wider text-sm">Active Fields</h2>
        <BuilderFieldsForm />
      </div>
    </>
  );
};
