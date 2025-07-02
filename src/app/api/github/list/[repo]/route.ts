import { fetchGithubContentList } from "@/lib/github/contents";
import { NextRequest, NextResponse } from "next/server";

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
