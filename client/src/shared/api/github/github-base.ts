import "server-only";

const GITHUB_AUTH_TOKEN = process.env.GITHUB_AUTH_TOKEN;
const GITHUB_USER = process.env.GITHUB_USER;

export async function fetchGitHubAPI<T>(
  uri: string,
  headerProperties?: Record<string, string>
): Promise<{ data: T | null; error: string | null }> {
  const url = `https://api.github.com/repos/${GITHUB_USER}` + uri;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_AUTH_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
        ...headerProperties,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const message = `GitHub API Error: ${response.status}`;
      return { data: null, error: message };
    }

    const json = await response.json();
    return { data: json, error: null };
  } catch (e) {
    return {
      data: null,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}
