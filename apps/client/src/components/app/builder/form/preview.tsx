import { useSearch } from "@tanstack/react-router";

import { PreviewZod } from "./form-schema-zod/preview-zod";
import { PreviewForm } from "./form-schema-zod/preview-form";
import { PreviewFormCode } from "./form-schema-zod/preview-form-code";

export const Preview = () => {
  return (
    <div className="flex w-[900px] gap-8">
      <div className="w-[450px] flex flex-col gap-2">
        <h2 className="uppercase tracking-wider text-sm">Form</h2>
        <PreviewForm />
      </div>

      <div className="w-[450px] flex flex-col gap-2">
        <h2 className="uppercase tracking-wider text-sm">Zod Schema</h2>
        <PreviewZod />

        <h2 className="uppercase tracking-wider text-sm">Form Code</h2>
        <PreviewFormCode />
      </div>
    </div>
  );
};
