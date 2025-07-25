import { formatUtcToKoreanDate } from "@/shared/lib/date";
import { GQLIssue } from "@/shared/types/api/github";
import PostItemSkeleton from "../post-item-skeleton/PostItemSkeleton";

interface Props {
  data: GQLIssue[] | undefined;
  isLoading: boolean;
  error: unknown;
}

export default function PostList({ data, isLoading, error }: Props) {
  return (
    <ul className="post-list">
      {isLoading ? (
        new Array(5).fill(1).map((_, index) => <PostItemSkeleton key={index} />)
      ) : error ? (
        <div>에러가 발생했습니다. </div>
      ) : data?.length === 0 ? (
        <p className="post-list">게시글이 없습니다.</p>
      ) : (
        <>
          {data?.map((post) => (
            <li key={post.id} className="post-item">
              <a href={`/posts/${post.number}`} className="post-link">
                <h2 className="post-title">{post.title}</h2>
                <p className="post-body">{post.comments?.nodes?.[0]?.body || null}</p>
                <div className="post-bottom-box">
                  <p className="post-date">{formatUtcToKoreanDate(post.createdAt)}</p>

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
                </div>
              </a>
            </li>
          ))}
        </>
      )}
    </ul>
  );
}
