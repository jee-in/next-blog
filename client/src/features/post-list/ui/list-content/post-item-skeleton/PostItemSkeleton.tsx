export default function PostItemSkeleton() {
  return (
    <li className="post-item">
      <a className="post-link" href="#">
        <h2 className="post-title skeleton skeleton-title" />
        <p className="post-body skeleton skeleton-body" />
        <div className="post-bottom-box">
          <div className="post-label-box">
            {new Array(1).fill(0).map((_, index) => (
              <span key={index} className="post-label skeleton skeleton-label" />
            ))}
          </div>
          <p className="post-date skeleton skeleton-date" />
        </div>
      </a>
    </li>
  );
}
