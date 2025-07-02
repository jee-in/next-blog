import { BASE_REPO } from "@/constants/contents";
import { fetchGithubMilestoneList } from "@/lib/github/issues";
import Link from "next/link";

export const revalidate = 86400;

export default async function TopicListPage() {
  const { data, error } = await fetchGithubMilestoneList(BASE_REPO!);

  if (error) {
    return <div>콘텐츠를 불러올 수 없습니다.</div>;
  }

  if (!data) {
    return <div>콘텐츠가 없습니다.</div>;
  }

  return (
    <>
      <div>
        {data.map((item, index) => {
          const categoryTitle = item.title;

          return (
            <div key={index}>
              <Link href={categoryTitle}>{categoryTitle}</Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
