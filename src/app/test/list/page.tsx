"use client";

import { ContentList } from "@/constants/github";
import { useEffect, useState } from "react";

export default function GithubReadmePage() {
  const [data, setData] = useState<ContentList[] | null>(null);

  useEffect(() => {
    fetch("/api/github/list/shell-lab")
      .then((res) => res.json())
      .then((data) => setData(data.data))
      .catch(console.error);
  }, []);

  if (!data) return <p>Loading...</p>;
  return (
    <div>
      <h2>Shell Lab 목록</h2>
      <div>
        {data.map((item, index) => (
          <div key={index}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}
