import MarkdownContent from "@/components/MarkdownContent";
import { fetchGithubFile, getPostDate } from "@/lib/github/contents";
import { extractMarkdownTitle, removeTitle } from "@/lib/markdown";

export const revalidate = 86400;

export default async function GithubReadmePage() {
  const ContentInfo = {
    repo: "shell-lab",
    branch: "main",
    path: "README.md",
  };

  const { data, error } = await fetchGithubFile(
    ContentInfo.repo,
    ContentInfo.branch,
    ContentInfo.path
  );

  if (error) {
    return <div>콘텐츠를 불러오는 데 실패했습니다.</div>;
  }

  if (!data) {
    return <div>콘텐츠가 없습니다.</div>;
  }

  const postDate = await getPostDate(ContentInfo.repo, ContentInfo.path);

  const title = extractMarkdownTitle(data) ?? "제목 없음";
  const content = removeTitle(data);

  if (!content) {
    return <div>콘텐츠가 없습니다.</div>;
  }

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
