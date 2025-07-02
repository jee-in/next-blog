import { GITHUB_AUTH_TOKEN } from "@/constants/github";

export async function fetchGitHubAPI<T>(
  url: string
): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_AUTH_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "force-cache",
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
