import { GQLIssue, Label } from "@/shared/types/api/github";

export interface PostListParams {
  owner?: string;
  repoName?: string;
  milestone?: string;
  labels?: string[];
  states?: ("OPEN" | "CLOSED")[];
  first?: number;
  orderField?: string;
  orderDirection?: string;
}

export async function requestGithubGraphQLIssueList(params: PostListParams): Promise<GQLIssue[]> {
  const res = await fetch(`/api/github/issues`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch post list");
  }

  const json = await res.json();
  return json.issues;
}

export interface LabelListParams {
  first?: number;
}

export async function requestGithubGraphQLLabelList(params: LabelListParams): Promise<Label[]> {
  const res = await fetch(`/api/github/labels`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch labels");
  }

  const json = await res.json();
  return json.labels;
}
