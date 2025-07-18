import "server-only";

const GITHUB_OWNER = process.env.GITHUB_OWNER!;
const GITHUB_BASE_REPO = process.env.NEXT_PUBLIC_API_BASE_REPO;
const GITHUB_AUTH_TOKEN = process.env.GITHUB_AUTH_TOKEN!;
const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

export async function fetchGitHubGraphQL<T>(
  query: string,
  variables?: Record<string, string | number | null | string[]>,
  headerProperties?: Record<string, string>,
  fetchOptions?: NextFetchRequestConfig
): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_AUTH_TOKEN}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...headerProperties,
      },
      body: JSON.stringify({
        query,
        variables: {
          ...variables,
          owner: GITHUB_OWNER,
          repoName: GITHUB_BASE_REPO,
        },
      }),
      ...fetchOptions,
    });

    const json = await response.json();

    if (!response.ok || json.errors) {
      const message = json.errors?.[0]?.message || `GitHub GraphQL Error`;
      return { data: null, error: message };
    }

    return { data: json.data as T, error: null };
  } catch (e) {
    return {
      data: null,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}
