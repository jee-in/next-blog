import { fetchPostDetail } from "@/features/post-detail/model/fetchPostDetail";
import { NextRequest, NextResponse } from "next/server";

interface ContextProps {
  params: Promise<{
    issueNumber: string;
  }>;
}

export async function GET(req: NextRequest, context: ContextProps) {
  const { issueNumber } = await context.params;

  if (!issueNumber || isNaN(Number(issueNumber))) {
    return NextResponse.json({ error: "Invalid repo or issue number." }, { status: 400 });
  }

  const { issue } = await fetchPostDetail(Number(issueNumber), {
    cache: "force-cache",
  });
  return NextResponse.json({ data: issue });
}
