import {
  PostListParams,
  requestGithubGraphQLIssueList,
} from "@/shared/api/graphql/handler/graphql-issue";
import { useQuery } from "@tanstack/react-query";

export function usePostList(params: PostListParams) {
  return useQuery({
    queryKey: [
      "postList",
      params.milestone,
      params.labels?.join(","),
      params.states?.join(","),
      params.orderField,
      params.orderDirection,
    ],
    queryFn: () => requestGithubGraphQLIssueList(params),
    staleTime: 30 * 60 * 60 * 1000,
    enabled: Array.isArray(params.labels),
  });
}
