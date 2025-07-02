import MarkdownContent from "@/components/MarkdownContent";
import { BASE_REPO } from "@/constants/contents";
import { fetchGithubFile, getPostDate } from "@/lib/github/contents";
import { extractMarkdownTitle, removeTitle } from "@/lib/markdown";

export const revalidate = 86400;

interface Props {
  params: Promise<{
    topic: string;
    reference: string;
    source: string;
  }>;
}

export default async function SourcePage({ params }: Props) {
  const { topic, reference, source } = await params;
  const path = `${topic}/references/${reference}/${source}.md`;
  const { data, error } = await fetchGithubFile(BASE_REPO!, "main", path);

  if (error) {
    return <div>콘텐츠를 불러올 수 없습니다.</div>;
  }

  if (!data) {
    return <div>내용이 없습니다.</div>;
  }

  const postDate = await getPostDate(BASE_REPO!, path);

  const title = extractMarkdownTitle(data) ?? "제목 없음";
  const content = removeTitle(data);

  return (
    <div>
      <div className="content-header">
        <h1>{title}</h1>
        <div>
          <span>{postDate.createdAt ?? ""}</span> 등록
        </div>
        <div>
          <span>{postDate.updatedAt ?? ""}</span> 업데이트
        </div>
      </div>
      <hr />
      <div className="content-container">
        <MarkdownContent content={content} />
      </div>
    </div>
  );
}
