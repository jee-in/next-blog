import "server-only";
import { GITHUB_AUTH_TOKEN, GITHUB_USER } from "@/constants/github";
import { formatUtcToKoreanDate } from "./date";
import { PostDate } from "@/app/types/github/post";
import { GitHubCommit, GithubRepoContentList } from "@/app/types/api/github";

export async function fetchGithubFile(
  repo: string,
  branch: string,
  path: string
): Promise<{
  data: string | null;
  error: string | null;
}> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${repo}/contents/${path}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_AUTH_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
        cache: "force-cache",
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      const message = `GitHub API Error: ${response.status}`;
      return { data: null, error: message };
    }

    const json = await response.json();
    const decoded = Buffer.from(json.content, "base64").toString("utf-8");
    return { data: decoded, error: null };
  } catch (e) {
    return {
      data: null,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}

export async function fetchGithubContentList(
  repo: string,
  path: string = "/"
): Promise<{
  data: GithubRepoContentList[] | null;
  error: string | null;
}> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${repo}/contents/${path}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_AUTH_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
        cache: "force-cache",
        next: { revalidate: 60 },
      }
    );

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

const commitDateCacheMap = new Map<string, PostDate>();

export enum CommitType {
  FIRST_COMMIT = "LAST_PAGE",
  LAST_COMMMIT = "1",
}

export async function getPostDate(
  repo: string,
  path: string
): Promise<PostDate> {
  const key = `${repo}/${path}`;

  if (commitDateCacheMap.has(key)) {
    return commitDateCacheMap.get(key)!;
  }

  const firstCommit = await fetchGithubCommit(
    repo,
    path,
    CommitType.LAST_COMMMIT
  );
  const updateCommit = await fetchGithubCommit(
    repo,
    path,
    CommitType.FIRST_COMMIT
  );

  const registerDate = formatUtcToKoreanDate(
    firstCommit[firstCommit.length - 1].commit.committer.date
  );
  const lastUpdate = formatUtcToKoreanDate(
    updateCommit[0].commit.committer.date
  );

  const postDate = { registerDate, lastUpdate };
  commitDateCacheMap.set(key, postDate);

  return postDate;
}

async function fetchGithubCommit(
  repo: string,
  path: string,
  commitType: CommitType
): Promise<GitHubCommit[]> {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_USER}/${repo}/commits`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_AUTH_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
        path: path,
        per_page: "1",
        pages: commitType,
      },
      cache: "force-cache",
      next: { revalidate: 60 },
    }
  );

  if (response.status >= 400 && response.status <= 599) {
    throw new Error(`GitHub API Error: ${response.status}`);
  }

  return response.json();
}
