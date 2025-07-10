import { fetchPostDetail } from "@/features/post-detail/model/fetchPostDetail";
import MarkdownContent from "@/features/post-detail/ui/post-content/HighlightMdContent";
import PostHeader from "@/features/post-detail/ui/post-header/PostHeader";

interface Props {
  params: Promise<{
    post: string;
  }>;
}

export default async function PostPage({ params }: Props) {
  const { post } = await params;
  const issueNumber = Number(post);

  const { issue, error } = await fetchPostDetail(issueNumber, undefined, {
    revalidate: 21600,
  });
  if (error) return <div>콘텐츠를 불러올 수 없습니다.</div>;
  if (!issue) return <div>내용이 없습니다.</div>;
  if (!issue.body) return <div>내용이 없습니다.</div>;

  return (
    <div className="content">
      <PostHeader
        title={issue.title}
        postDate={{
          createdAt: issue.createdAt,
          updatedAt: issue.updatedAt,
        }}
      />
      <hr />
      <MarkdownContent content={issue.body} />
    </div>
  );
}
