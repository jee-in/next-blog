import { BASE_REPO, TOPIC_MAP, TopicPath } from "@/constants/contents";
import { fetchGithubIssueListByMilestone } from "@/lib/github/issues";
import Link from "next/link";

export const revalidate = 86400;

interface Props {
  params: Promise<{ topic: string }>;
}

export default async function TopicPage({ params }: Props) {
  const { topic } = await params;
  const topicObj = TOPIC_MAP.get(topic as TopicPath);

  if (!topicObj) {
    return <div>콘텐츠를 불러올 수 없습니다.</div>;
  }

  const { data, error } = await fetchGithubIssueListByMilestone(
    BASE_REPO!,
    topicObj.milestoneNo
  );

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
          const contentTitle = item.title;
          const contentIdx = item.number;

          return (
            <div key={index}>
              <Link href={`${topic}/${contentIdx}`}>{contentTitle}</Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
