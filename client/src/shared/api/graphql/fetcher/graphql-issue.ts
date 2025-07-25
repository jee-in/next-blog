import { fetchGitHubGraphQL } from "@/shared/api/graphql/graphql-base";
import { GQLIssue } from "@/shared/types/api/github";

export interface PostListParams {
  owner?: string;
  repoName?: string;
  milestone?: string | null;
  labels?: string[];
  states?: ("OPEN" | "CLOSED")[];
  first?: number;
  orderField?: string;
  orderDirection?: string;
}

const query = `
  query (
    $owner: String!,
    $repoName: String!,
    $milestone: String,
    $labels: [String!],
    $states: [IssueState!],
    $first: Int,
    $orderField: IssueOrderField!,
    $orderDirection: OrderDirection!
  ) {
    repository(owner: $owner, name: $repoName) {
      issues(
        first: $first,
        filterBy: {
          milestone: $milestone,
          labels: $labels,
          states: $states
        },
        orderBy: { field: $orderField, direction: $orderDirection }
      ) {
        nodes {
          id
          number
          title
          body
          url
          createdAt
          updatedAt
          labels(first: 10) {
            nodes {
              id
              name
              color
            }
          }
        }
      }
    }
  }
`;

export async function fetchGithubGraphQLIssueList(params: PostListParams): Promise<GQLIssue[]> {
  const {
    milestone = null,
    labels = [],
    states = ["OPEN"],
    first = 10,
    orderField = "CREATED_AT",
    orderDirection = "DESC",
  } = params;

  const { data, error } = await fetchGitHubGraphQL<{
    repository: { issues: { nodes: GQLIssue[] } };
  }>(
    query,
    {
      milestone,
      labels,
      states,
      first,
      orderField,
      orderDirection,
    },
    {},
    { next: { revalidate: 21600 } }
  );

  if (error) {
    throw new Error(error);
  }

  return data?.repository.issues.nodes ?? [];
}
