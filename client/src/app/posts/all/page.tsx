"use client";

import { useLabelList } from "@/features/post-list/model/useLabelList";
import { usePostList } from "@/features/post-list/model/usePostList";
import PostList from "@/features/post-list/ui/list-content/PostList";
import Postfilter from "@/features/post-list/ui/list-header/PostFilter";
import { Suspense, useState } from "react";

export default function PostListPage() {
  const { data: allLabels } = useLabelList({});

  const [selectedLabels, setSelectedLabels] = useState<Set<string>>(new Set());

  const { data, isLoading, error } = usePostList({
    owner: "jee-in",
    repoName: "docs",
    labels:
      selectedLabels.size > 0 ? Array.from(selectedLabels) : allLabels?.map((label) => label.name),
    milestone: undefined,
    states: ["OPEN"],
    first: 10,
  });

  return (
    <div className="content">
      <Suspense fallback={<div>로딩 중</div>}>
        <Postfilter
          allLabels={allLabels}
          selectedLabels={selectedLabels}
          setSelectedLabels={setSelectedLabels}
        />
      </Suspense>
      <PostList posts={data} isLoading={isLoading} error={error} />
    </div>
  );
}
