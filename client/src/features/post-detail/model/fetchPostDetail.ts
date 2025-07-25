import { fetchGitHubGraphQL } from "@/shared/api/graphql/graphql-base";
import { GQLIssue } from "@/shared/types/api/github";

const query = `
query ($owner: String!, $repoName: String!, $issueNumber: Int!) {
  repository(owner: $owner, name: $repoName) {
    issue(number: $issueNumber) {
      id
      number
      title
      body
      url
      createdAt
      updatedAt
      comments(first: 1) {
        nodes {
          id
          body
          createdAt
        }
      }
    }
  }
}
`;

export async function fetchPostDetail(
  issueNumber: number,
  headerProperties?: Record<string, string>,
  fetchOptions?: NextFetchRequestConfig
): Promise<{ issue: GQLIssue | null; error: string | null }> {
  const { data, error } = await fetchGitHubGraphQL<{
    repository: { issue: GQLIssue };
  }>(query, { issueNumber }, headerProperties, fetchOptions);

  if (error) {
    return { issue: null, error };
  }

  return { issue: data?.repository.issue ?? null, error: null };
}
