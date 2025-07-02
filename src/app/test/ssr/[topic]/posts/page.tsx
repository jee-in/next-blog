import { BASE_REPO } from "@/constants/contents";
import { fetchGithubContentList } from "@/lib/github/contents";
import { removeMdExtension } from "@/lib/markdown";
import Link from "next/link";

export const revalidate = 86400;

interface Props {
  params: Promise<{ topic: string }>;
}

export default async function TopicListPage({ params }: Props) {
  const { topic } = await params;
  const { data, error } = await fetchGithubContentList(
    BASE_REPO!,
    `${topic}/posts`
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
          const postTitle = removeMdExtension(decodeURIComponent(item.name));

          return (
            <div key={index}>
              <Link href={`posts/${postTitle}`}>{postTitle}</Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
