import { fetchGithubContentList } from "@/lib/github";

export const revalidate = 3600;

export default async function GithubContentList() {
  const data = await fetchGithubContentList("shell-lab");

  return (
    <div>
      <h2>Shell Lab 목록</h2>
      <div>
        {data.map((item, index) => (
          <div key={index}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}
