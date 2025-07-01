import { fetchGithubContentList } from "@/lib/github";
import { BASE_REPO, referenceMap } from "@/constants/post";
import { removeMdExtension } from "@/lib/markdown";
import Link from "next/link";

export const revalidate = 86400;

interface Props {
  params: Promise<{
    topic: string;
    reference: string;
  }>;
}

export default async function TopicListPage({ params }: Props) {
  const { topic, reference } = await params;
  const { data, error } = await fetchGithubContentList(
    BASE_REPO!,
    `${topic}/references/${reference}`
  );

  if (error) {
    return <div>콘텐츠를 불러올 수 없습니다.</div>;
  }

  if (!data) {
    return <div>콘텐츠가 없습니다.</div>;
  }

  const referenceTitle = referenceMap.get(reference);

  return (
    <>
      <h1>{referenceTitle}</h1>
      <div>
        {data.map((item, index) => {
          const sourceTitle = removeMdExtension(item.name);

          return (
            <div key={index}>
              <Link href={`${reference}/${sourceTitle}`}>{sourceTitle}</Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
