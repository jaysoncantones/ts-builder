import { z } from "zod";

export const Fields = [
  {
    value: "text",
    label: "Text",
    placeholder: true,
    minmax: false,
    minmaxLength: true,
    options: false,
  },
  {
    value: "email",
    label: "Email",
    placeholder: true,
    minmax: false,
    minmaxLength: true,
    options: false,
  },
  {
    value: "number",
    label: "Number",
    placeholder: true,
    minmax: true,
    minmaxLength: false,
    options: false,
  },
  {
    value: "textarea",
    label: "Textarea",
    placeholder: true,
    minmax: false,
    minmaxLength: true,
    options: false,
  },
  {
    value: "password",
    label: "Password",
    placeholder: true,
    minmax: false,
    minmaxLength: true,
    options: false,
  },
  {
    value: "select",
    label: "Select",
    placeholder: false,
    minmax: false,
    minmaxLength: false,
    options: true,
  },
  {
    value: "checkbox",
    label: "Checkbox",
    placeholder: false,
    minmax: false,
    minmaxLength: false,
    options: false,
  },
] as const;
export type Fields = (typeof Fields)[number]["value"];
export const FieldsDefault = Fields[0].value;
export const FieldsEnum = Fields.map((s) => s.value) as [Fields, ...Fields[]];

export const Builder = z.object({
  id: z.string(),
  type: z.enum(FieldsEnum),
  label: z.string(),
  name: z.string(),
  required: z.boolean(),
  placeholder: z.string(),
  options: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .array()
    .optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
});

export type Builder = z.infer<typeof Builder>;

export const BuilderDefaults: Builder = {
  id: "",
  type: FieldsDefault,
  label: "",
  name: "demo",
  required: false,
  placeholder: "",
  options: undefined,
  minLength: undefined,
  maxLength: undefined,
  min: undefined,
  max: undefined,
};

export const BuilderFields = z.object({
  fields: Builder.array(),
});

export type BuilderFields = z.infer<typeof BuilderFields>;

export const BuilderFieldsDefaults: BuilderFields = {
  fields: [BuilderDefaults],
};

// LOGIC
const placeholderMap: Record<Fields, boolean> = Object.fromEntries(
  Fields.map((f) => [f.value, f.placeholder])
) as Record<Fields, boolean>;

const minmaxMap: Record<Fields, boolean> = Object.fromEntries(
  Fields.map((f) => [f.value, f.minmax])
) as Record<Fields, boolean>;

const minmaxLengthMap: Record<Fields, boolean> = Object.fromEntries(
  Fields.map((f) => [f.value, f.minmaxLength])
) as Record<Fields, boolean>;

const optionsMap: Record<Fields, boolean> = Object.fromEntries(
  Fields.map((f) => [f.value, f.options])
) as Record<Fields, boolean>;

export const BuilderFieldsLogic = (type: Fields) => ({
  isPlaceholder: placeholderMap[type],
  isMinMax: minmaxMap[type],
  isMinMaxLength: minmaxLengthMap[type],
  isOptions: optionsMap[type],
});
