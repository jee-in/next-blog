import { fetchGithubIssue } from "@/lib/github/issues";

import { NextRequest, NextResponse } from "next/server";

interface ContextProps {
  params: Promise<{
    repo: string;
    issue: string;
  }>;
}

export async function GET(req: NextRequest, context: ContextProps) {
  const { repo, issue } = await context.params;
  const { data } = await fetchGithubIssue(repo, Number(issue));
  return NextResponse.json({ data: data });
}
