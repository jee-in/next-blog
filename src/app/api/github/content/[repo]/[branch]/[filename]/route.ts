import { GITHUB_AUTH_TOKEN, GITHUB_USER } from "@/constants/github";
import axios from "axios";

import { NextRequest, NextResponse } from "next/server";

interface ContextProps {
  params: Promise<{
    repo: string;
    branch: string;
    filename: string;
  }>;
}

export async function GET(req: NextRequest, context: ContextProps) {
  const { repo, branch, filename } = await context.params;
  const data = await fetchGithubFile(repo, branch, filename);
  return NextResponse.json({ data: data });
}

async function fetchGithubFile(repo: string, branch: string, filename: string) {
  const response = await axios.get(
    `https://raw.githubusercontent.com/${GITHUB_USER}/${repo}/${branch}/${filename}`,
    {
      headers: {
        Authorization: GITHUB_AUTH_TOKEN,
      },
    }
  );

  if (response.status >= 400 && response.status <= 599) {
    throw new Error(`GitHub API Error: ${response.status}`);
  }

  return response.data;
}
