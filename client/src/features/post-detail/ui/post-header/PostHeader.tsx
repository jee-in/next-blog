import { formatUtcToKoreanDate, isSameDate } from "@/shared/lib/date";
import { PostDate } from "@/shared/types/blog/post";

interface PostHeaderProps {
  title: string;
  postDate: PostDate;
  summary: string | null;
}

export default function PostHeader({ title, postDate, summary }: PostHeaderProps) {
  const isSame = isSameDate(postDate.createdAt, postDate.updatedAt);
  const updateMsg = formatUtcToKoreanDate(postDate.updatedAt)
    ? `${formatUtcToKoreanDate(postDate.updatedAt)} 업데이트`
    : "등록 이후 업데이트된 포스트입니다.";

  return (
    <div className="content-header">
      <h1>{title}</h1>
      <div className="post-heaeder-bottom-box">
        <div className="post-date gap-2">
          <div>{formatUtcToKoreanDate(postDate.createdAt)}</div>
          <div>등록</div>
          <i className="info-icon">
            <div className="info-tooltip">{isSame ? "최신 글입니다." : updateMsg}</div>
          </i>
        </div>
      </div>
      <div className="post-header-summary">{summary}</div>
    </div>
  );
}
