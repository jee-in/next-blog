import Link from "next/link";
// import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">
          <Link href="/">
            <span className="blog-title">BLOG</span>
          </Link>
        </div>
        <div>{/* <ThemeToggle /> */}</div>
      </div>
    </header>
  );
}
