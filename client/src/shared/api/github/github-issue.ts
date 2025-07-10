import "server-only";
import { Issue, Milestone } from "@/shared/types/api/github";
import { fetchGitHubAPI } from "./github-base";

export async function fetchGithubMilestoneList(
  repo: string
): Promise<{ data: Milestone[] | null; error: string | null }> {
  const uri = `/${repo}/milestones`;
  return await fetchGitHubAPI(uri);
}

export async function fetchGithubIssueListByMilestone(
  repo: string,
  milestone: string
): Promise<{ data: Issue[] | null; error: string | null }> {
  const uri = `/${repo}/issues?milestone=${milestone}`;
  return await fetchGitHubAPI(uri);
}

export async function fetchGithubIssue(
  repo: string,
  no: string
): Promise<{ data: Issue | null; error: string | null }> {
  const uri = `/${repo}/issues/${no}`;
  return await fetchGitHubAPI(uri);
}
