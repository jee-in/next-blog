import {
  LabelListParams,
  requestGithubGraphQLLabelList,
} from "@/shared/api/graphql/handler/graphql-issue";
import { useQuery } from "@tanstack/react-query";

export function useLabelList(params: LabelListParams) {
  return useQuery({
    queryKey: ["labels"],
    queryFn: () => requestGithubGraphQLLabelList(params),
    staleTime: 30 * 60 * 60 * 1000,
  });
}
