import { NextRequest, NextResponse } from "next/server";
import { fetchGitHubGraphQL } from "@/shared/api/graphql/graphql-base";

const query = `
query (
  $owner: String!,
  $repoName: String!,
  $first: Int = 10
) {
  repository(owner: $owner, name: $repoName) {
    milestones(first: $first) {
      nodes {
        id
        title
        description
        state
        dueOn
        createdAt
        updatedAt
      }
    }
  }
}
`;

export async function POST(req: NextRequest) {
  try {
    const { owner, repoName, first = 10 } = await req.json();

    if (!owner || !repoName) {
      return NextResponse.json({ error: "Missing owner or repoName" }, { status: 400 });
    }

    const { data, error } = await fetchGitHubGraphQL<{
      repository: {
        milestones: {
          nodes: {
            id: string;
            title: string;
            description: string | null;
            state: "OPEN" | "CLOSED";
            dueOn: string | null;
            createdAt: string;
            updatedAt: string;
          }[];
        };
      };
    }>(query, { owner, repoName, first }, { cache: "force-cache" });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({
      milestones: data?.repository.milestones.nodes ?? [],
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
