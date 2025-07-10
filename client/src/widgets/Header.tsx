import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">
          <Link href="/">
            <span className="blog-title">BLOG</span>
          </Link>
        </div>
        <div className="mx-2">
          <Link href="/posts/all">
            <span className="text-white text-lg font-bold">posts</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
