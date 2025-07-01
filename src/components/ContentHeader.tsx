import { PostDate } from "@/app/types/github/post";

interface ContentHeaderProps {
  title: string;
  postDate: PostDate;
}

export default function ContentHeader({ title, postDate }: ContentHeaderProps) {
  return (
    <div className="content-header">
      <h1>{title}</h1>
      <div>
        <span>{postDate.registerDate ?? ""}</span> 등록
      </div>
      <div>
        <span>{postDate.lastUpdate ?? ""}</span> 업데이트
      </div>
    </div>
  );
}
