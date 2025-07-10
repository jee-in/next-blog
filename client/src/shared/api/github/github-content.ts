import "server-only";

import { GitHubCommit, GithubRepoContentList } from "@/shared/types/api/github";
import { fetchGitHubAPI } from "./github-base";

export async function fetchGithubContentList(
  repo: string,
  path: string = "/"
): Promise<{
  data: GithubRepoContentList[] | null;
  error: string | null;
}> {
  const uri = `/${repo}/contents/${path}`;
  return await fetchGitHubAPI(uri);
}

export async function fetchGithubFile(
  repo: string,
  path: string
): Promise<{
  data: string | null;
  error: string | null;
}> {
  const uri = `/${repo}/contents/${path}`;
  return await fetchGitHubAPI(uri);
}

export async function fetchGithubCommit(
  repo: string,
  path: string,
  perPage: string,
  page: string
): Promise<{
  data: GitHubCommit[] | null;
  error: string | null;
}> {
  const uri = `/${repo}/commits`;
  const headerProperties = {
    path: path,
    per_page: perPage,
    pages: page,
  };
  return await fetchGitHubAPI(uri, headerProperties);
}
