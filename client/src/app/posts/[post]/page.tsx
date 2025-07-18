import { fetchPostDetail } from "@/features/post-detail/model/fetchPostDetail";
import MarkdownContent from "@/features/post-detail/ui/post-content/HighlightMdContent";
import PostHeader from "@/features/post-detail/ui/post-header/PostHeader";
import { fetchGithubGraphQLIssueList } from "@/shared/api/graphql/fetcher/graphql-issue";
import { Metadata } from "next";

export async function generateStaticParams() {
  const issues = await fetchGithubGraphQLIssueList({ first: 50 });

  return issues.map((issue) => ({
    post: issue.number.toString(),
  }));
}
interface Props {
  params: Promise<{
    post: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const issueNumber = Number((await params).post);
  const { issue } = await fetchPostDetail(issueNumber);

  if (!issue) {
    return {
      title: "내용이 없습니다",
      description: "게시글을 불러올 수 없습니다",
    };
  }

  return {
    title: issue.title,
    description: issue.body?.slice(0, 160) || "게시글 상세 내용",
  };
}

export const revalidate = 21600;

export default async function PostPage({ params }: Props) {
  const issueNumber = Number((await params).post);
  const { issue, error } = await fetchPostDetail(issueNumber);

  if (error) return <div>콘텐츠를 불러올 수 없습니다.</div>;
  if (!issue?.body) return <div>내용이 없습니다.</div>;

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
