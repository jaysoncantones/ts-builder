import { CodeBlock } from "~/lib/syntax-highlighter";
import { useBuilderQuery } from "./use-builder-query";

export const PreviewZod = () => {
  const { fieldsZodTemplate } = useBuilderQuery([]);

  return (
    <div>
      <CodeBlock code={fieldsZodTemplate} language="typescript" />
    </div>
  );
};
