import { verifyRevalidateToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");
  if (secret && !verifyRevalidateToken(secret)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { path } = await req.json();

  try {
    await revalidatePath(path);
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    let statusCode = 500;
    if (err instanceof ApiError) {
      statusCode = err.statusCode;
    }

    return NextResponse.json(
      { message: "Revalidation failed" },
      { status: statusCode }
    );
  }
}
