import { BASE_REPO } from "@/constants/contents";
import { fetchGithubIssueListByMilestone } from "@/lib/github/issues";

import { NextRequest, NextResponse } from "next/server";

interface ContextProps {
  params: Promise<{
    repo: string;
    milestone: string;
  }>;
}

export async function GET(req: NextRequest, context: ContextProps) {
  const { milestone } = await context.params;
  const { data } = await fetchGithubIssueListByMilestone(
    BASE_REPO!,
    Number(milestone)
  );
  return NextResponse.json({ data: data });
}
