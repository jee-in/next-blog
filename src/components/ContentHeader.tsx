import { PostDate } from "@/app/types/contents/post";
import { formatUtcToKoreanDate } from "@/lib/date";

interface ContentHeaderProps {
  title: string;
  postDate: PostDate;
}

export default function ContentHeader({ title, postDate }: ContentHeaderProps) {
  return (
    <div className="content-header">
      <h1>{title}</h1>
      <div>
        <span>{formatUtcToKoreanDate(postDate.createdAt) ?? ""}</span> 등록
      </div>
      <div>
        <span>{formatUtcToKoreanDate(postDate.updatedAt) ?? ""}</span> 업데이트
      </div>
    </div>
  );
}
