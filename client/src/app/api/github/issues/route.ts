import { NextRequest, NextResponse } from "next/server";
import { fetchGitHubGraphQL } from "@/shared/api/graphql/graphql-base";
import { GQLIssue } from "@/shared/types/api/github";

const query = `
query (
  $owner: String!,
  $repoName: String!,
  $milestone: String,
  $labels: [String!],
  $states: [IssueState!],
  $first: Int,
  $orderField: IssueOrderField!,
  $orderDirection: OrderDirection!
) {
  repository(owner: $owner, name: $repoName) {
    issues(
      first: $first,
      filterBy: {
        milestone: $milestone,
        labels: $labels,
        states: $states
      },
      orderBy: { field: $orderField, direction: $orderDirection }
    ) {
      nodes {
        id
        number
        title
        createdAt
        updatedAt
        labels(first: 10) {
          nodes {
            id
            name
            color
          }
        }
        comments(first: 1) {
          nodes {
            id
            body
            createdAt
          }
        }
      }
    }
  }
}
`;

export async function POST(req: NextRequest) {
  try {
    const {
      owner,
      repoName,
      milestone,
      labels,
      states = ["OPEN"],
      first = 10,
      orderField = "CREATED_AT",
      orderDirection = "DESC",
    } = await req.json();

    const { data, error } = await fetchGitHubGraphQL<{
      repository: { issues: { nodes: GQLIssue[] } };
    }>(query, {
      owner,
      repoName,
      milestone,
      labels,
      states,
      first,
      orderField,
      orderDirection,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({
      issues: data?.repository.issues.nodes ?? [],
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
