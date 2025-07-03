import { BASE_REPO, TOPIC_MAP, TopicPath } from "@/constants/contents";
import { fetchGithubMilestoneList } from "@/lib/github/issues";
import Link from "next/link";

export default async function Home() {
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
          const topicPath = item.title;
          const topicTitle =
            TOPIC_MAP.get(item.title as TopicPath)?.topic ?? "제목 없음";

          return (
            <div key={index}>
              <Link href={`${topicPath}`}>{topicTitle}</Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
