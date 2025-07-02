import { fetchGithubFile } from "@/lib/github/contents";

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
