import { Builder } from "./builder-schema";
import { output as outputZodTemplate } from "./builder-template-zod";
import { output as outputZodSchema } from "./builder-template-zodschema";
import { output as outputFormCodeTemplate } from "./builder-template-form-code";

let FieldsArray: Builder[] = [];

export const builderProcess = async ({
  data,
  action,
}: {
  data: Builder[] | [];
  action?: "insert" | "update" | "delete";
}) => {
  if (action === "insert") {
    FieldsArray = [...FieldsArray, ...data];
  } else if (action === "update") {
    FieldsArray = [...data];
  } else if (action === "delete") {
    FieldsArray = [...data];
  } else {
    FieldsArray = [...FieldsArray, ...data];
  }

  const fields = FieldsArray;
  const { result: fieldsZodTemplate } = await outputZodTemplate(FieldsArray);
  const { result: fieldsZodSchema } = outputZodSchema(fields);
  const { result: fieldsFormCodeTemplate } =
    await outputFormCodeTemplate(fields);

  return {
    fields,
    fieldsZodTemplate,
    fieldsZodSchema,
    fieldsFormCodeTemplate,
  };
};
