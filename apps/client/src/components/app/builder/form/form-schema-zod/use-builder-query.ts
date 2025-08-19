import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Builder } from "./builder-schema";
import { builderProcess } from "./builder-process";

const queryKey = ["form-builder"];

export const useBuilderQuery = (data: Builder[]) => {
  const query = useQuery({
    queryKey,
    queryFn: () => builderProcess({ data }),
  });

  const fields = query.data?.fields || [];
  const fieldsZodTemplate = query.data?.fieldsZodTemplate || "";
  const fieldsZodSchema = query.data?.fieldsZodSchema;
  const fieldsFormCodeTemplate = query.data?.fieldsFormCodeTemplate || "";

  return { fields, fieldsZodTemplate, fieldsZodSchema, fieldsFormCodeTemplate };
};

export const useBuilderMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isError } = useMutation({
    mutationFn: builderProcess,
    onMutate: (data) => {
      return;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    mutate,
    isError,
  };
};
