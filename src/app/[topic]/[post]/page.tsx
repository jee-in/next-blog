import ContentHeader from "@/components/ContentHeader";
import MarkdownContent from "@/components/MarkdownContent";
import { BASE_REPO } from "@/constants/contents";
import { fetchGithubIssue } from "@/lib/github/issues";

export const revalidate = 86400;

interface Props {
  params: Promise<{
    topic: string;
    post: string;
  }>;
}

export default async function PostPage({ params }: Props) {
  const { post } = await params;
  const { data, error } = await fetchGithubIssue(BASE_REPO!, Number(post));

  if (error) {
    return <div>콘텐츠를 불러올 수 없습니다.</div>;
  }

  if (!data) {
    return <div>내용이 없습니다.</div>;
  }

  const title = data.title;
  const content = data.body;
  const postDate = { createdAt: data.created_at, updatedAt: data.updated_at };

  if (!content) {
    return <div>콘텐츠가 없습니다.</div>;
  }

  return (
    <div className="content">
      <ContentHeader title={title} postDate={postDate} />
      <hr />
      <MarkdownContent content={content} />
    </div>
  );
}
