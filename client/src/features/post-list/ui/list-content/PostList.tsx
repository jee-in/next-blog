import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";
import { formatUtcToKoreanDate } from "@/shared/lib/date";
import { GQLIssue } from "@/shared/types/api/github";

interface Props {
  posts: GQLIssue[] | undefined;
  isLoading: boolean;
  error: unknown;
}

export default function PostList({ posts, isLoading, error }: Props) {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>에러가 발생했습니다.</p>;

  if (!posts) return;

  if (posts.length === 0) {
    return <p className="post-list">게시글이 없습니다.</p>;
  }

  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.id} className="post-item">
          <a href={`/posts/${post.number}`} className="post-link">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body}...</p>
            <div className="post-bottom-box">
              <div className="post-label-box">
                {post.labels.nodes?.map((label) => (
                  <span
                    key={label.id}
                    className="post-label"
                    style={{
                      backgroundColor: `#${label.color}`,
                      color: "white",
                    }}
                  >
                    {label.name}
                  </span>
                ))}
              </div>
              <p className="post-date">{formatUtcToKoreanDate(post.createdAt)}</p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
