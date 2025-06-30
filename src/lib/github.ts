import "server-only";
import { ContentList } from "@/app/types/github";
import { GITHUB_AUTH_TOKEN, GITHUB_USER } from "@/constants/github";

export async function fetchGithubFile(
  repo: string,
  branch: string,
  filename: string
) {
  const response = await fetch(
    `https://raw.githubusercontent.com/${GITHUB_USER}/${repo}/${branch}/${filename}`
  );

  if (response.status >= 400 && response.status <= 599) {
    throw new Error(`GitHub API Error: ${response.status}`);
  }

  return response.text();
}

export async function fetchGithubContentList(
  repo: string
): Promise<ContentList[]> {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_USER}/${repo}/contents`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_AUTH_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  if (response.status >= 400 && response.status <= 599) {
    throw new Error(`GitHub API Error: ${response.status}`);
  }

  return response.json();
}
