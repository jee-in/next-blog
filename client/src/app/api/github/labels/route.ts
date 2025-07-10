import { NextRequest, NextResponse } from "next/server";
import { fetchGitHubGraphQL } from "@/shared/api/graphql/graphql-base";

const query = `
query ($owner: String!, $repoName: String!, $first: Int = 10) {
  repository(owner: $owner, name: $repoName) {
    labels(first: $first) {
      nodes {
        id
        name
        color
        description
      }
    }
  }
}
`;

export async function POST(req: NextRequest) {
  try {
    const { first = 10 } = await req.json();

    const { data, error } = await fetchGitHubGraphQL<{
      repository: {
        labels: {
          nodes: {
            id: string;
            name: string;
            color: string;
            description: string | null;
          }[];
        };
      };
    }>(query, { first }, { cache: "force-cache" });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({
      labels: data?.repository.labels.nodes ?? [],
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
