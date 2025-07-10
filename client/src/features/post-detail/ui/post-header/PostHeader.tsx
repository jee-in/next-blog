import { formatUtcToKoreanDate, isSameDate } from "@/shared/lib/date";
import { PostDate } from "@/shared/types/blog/post";

interface PostHeaderProps {
  title: string;
  postDate: PostDate;
}

export default function PostHeader({ title, postDate }: PostHeaderProps) {
  const isSame = isSameDate(postDate.createdAt, postDate.updatedAt);

  return (
    <div className="content-header">
      <h1>{title}</h1>
      <div className="post-heaeder-bottom-box">
        <span className="post-date">{formatUtcToKoreanDate(postDate.createdAt) ?? ""} 등록</span>
        {!isSame && (
          <span className="post-date">
            {formatUtcToKoreanDate(postDate.updatedAt) ?? ""} 업데이트
          </span>
        )}
      </div>
    </div>
  );
}
