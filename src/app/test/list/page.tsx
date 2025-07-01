import { fetchGithubContentList } from "@/lib/github";

export const revalidate = 86400;

export default async function GithubContentList() {
  const { data, error } = await fetchGithubContentList("shell-lab");

  if (error) {
    return <div>콘텐츠를 불러오는 데 실패했습니다.</div>;
  }

  if (!data) {
    return <div>콘텐츠가 없습니다.</div>;
  }

  return (
    <div>
      <h2>Shell Lab 목록</h2>
      <div>
        {data.map((item, index) => (
          <div key={index}>
            <div>{item.name}</div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
}
