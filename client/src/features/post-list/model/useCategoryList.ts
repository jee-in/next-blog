import { useQuery } from "@tanstack/react-query";

export interface Milestone {
  id: string;
  title: string;
  description: string | null;
  state: "OPEN" | "CLOSED";
  dueOn: string | null;
  createdAt: string;
  updatedAt: string;
}

interface MilestoneListParams {
  owner: string;
  repoName: string;
  first?: number;
}

export function useMilestoneList(params: MilestoneListParams) {
  return useQuery({
    queryKey: ["milestones", params.owner, params.repoName, params.first],
    queryFn: () => fetchGithubGraphQLMilestoneList(params),
    staleTime: 30 * 60 * 60 * 1000,
  });
}

async function fetchGithubGraphQLMilestoneList(params: MilestoneListParams): Promise<Milestone[]> {
  const res = await fetch("/api/github/milestones", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch milestones");
  }

  const json = await res.json();
  return json.milestones;
}
