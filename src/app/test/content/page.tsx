"use client";

import Content from "@/components/Content";
import { useEffect, useState } from "react";

export default function GithubReadmePage() {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/github/content/shell-lab/main/README.md")
      .then((res) => res.json())
      .then((data) => setData(data.data))
      .catch(console.error);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Shell Lab README.md</h2>
      <Content>{data}</Content>
    </div>
  );
}
