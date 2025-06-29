import { GITHUB_USER, GITHUB_AUTH_TOKEN } from "@/constants/github";
import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

interface ContextProps {
  params: Promise<{
    repo: string;
  }>;
}

export async function GET(req: NextRequest, context: ContextProps) {
  const params = await context.params;
  const data = await fetchGithubContentList(params.repo);
  return NextResponse.json({ data: data });
}

const octokit = new Octokit({
  auth: GITHUB_AUTH_TOKEN,
});

async function fetchGithubContentList(repo: string) {
  const response = await octokit.request("GET /repos/{owner}/{repo}/contents", {
    owner: GITHUB_USER,
    repo: repo,
    path: "",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (response.status >= 400 && response.status <= 599) {
    throw new Error(`GitHub API Error: ${response.status}`);
  }

  return response.data;
}
