import { GITHUB_USER } from "@/constants/github";
import { fetchGitHubAPI } from "./base";
import { Issue, Milestone } from "@/app/types/api/github";

export async function fetchGithubMilestoneList(
  repo: string
): Promise<{ data: Milestone[] | null; error: string | null }> {
  const url = `https://api.github.com/repos/${GITHUB_USER}/${repo}/milestones`;
  return await fetchGitHubAPI(url);
}

export async function fetchGithubIssueListByMilestone(
  repo: string,
  milestone: number
): Promise<{ data: Issue[] | null; error: string | null }> {
  const url = `https://api.github.com/repos/${GITHUB_USER}/${repo}/issues?milestone=${milestone}`;
  return await fetchGitHubAPI(url);
}

export async function fetchGithubIssue(
  repo: string,
  no: number
): Promise<{ data: Issue | null; error: string | null }> {
  const url = `https://api.github.com/repos/${GITHUB_USER}/${repo}/issues/${no}`;
  return await fetchGitHubAPI(url);
}
