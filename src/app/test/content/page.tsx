import Content from "@/components/Content";
import { fetchGithubFile } from "@/lib/github";

export const revalidate = 3600;

export default async function GithubReadmePage() {
  const data = await fetchGithubFile("shell-lab", "main", "README.md");

  return (
    <div>
      <h2>Shell Lab README.md</h2>
      <Content>{data}</Content>
    </div>
  );
}
