import { CodeBlock } from "~/lib/syntax-highlighter";
import { useBuilderQuery } from "./use-builder-query";

export const PreviewFormCode = () => {
  const { fieldsFormCodeTemplate } = useBuilderQuery([]);

  return (
    <div>
      <CodeBlock code={fieldsFormCodeTemplate} language="typescript" />
    </div>
  );
};
