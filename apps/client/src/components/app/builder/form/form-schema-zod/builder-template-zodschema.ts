import { z } from "zod";
import { Builder } from "./builder-schema";

const utilFieldToZodSchema = (fields: Builder[]) => {
  let shape: Record<string, z.ZodTypeAny> = {};

  for (const [key, field] of Object.entries(fields)) {
    let zodType: z.ZodTypeAny;

    switch (field.type) {
      case "number":
        let numType = z.coerce.number();
        if (field.min) numType = numType.min(field.min);
        if (field.max) numType = numType.max(field.max);
        zodType = numType;
        break;
      default:
        let strType = z.string();
        if (field.minLength) strType = strType.min(field.minLength);
        if (field.maxLength) strType = strType.max(field.maxLength);
        zodType = strType;
        break;
    }

    if (!field.required) {
      zodType = zodType.optional();
    }

    shape[field.name] = zodType;
  }

  return z.object(shape);
};

export const output = (fields: Builder[]) => {
  const result = utilFieldToZodSchema(fields);
  return { result };
};
