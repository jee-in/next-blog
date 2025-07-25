"use client";

import { useLabelList } from "@/features/post-list/model/useLabelList";
import { usePostList } from "@/features/post-list/model/usePostList";
import PostList from "@/features/post-list/ui/list-content/post-list/PostList";
import Postfilter from "@/features/post-list/ui/list-header/PostFilter";
import { Suspense, useState } from "react";

export default function PostListPage() {
  const { data: labelListData, isLoading: isLabelLoading, error: labelError } = useLabelList({});

  const [selectedLabels, setSelectedLabels] = useState<Set<string>>(new Set());

  const {
    data: postListData,
    isLoading: isPostLoading,
    error: postError,
  } = usePostList({
    labels:
      selectedLabels.size > 0
        ? Array.from(selectedLabels).sort()
        : labelListData?.map((label) => label.name).sort(),
    milestone: undefined,
    first: 10,
  });

  return (
    <div className="content">
      <Suspense fallback={<div></div>}>
        <Postfilter
          selectedLabels={selectedLabels}
          setSelectedLabels={setSelectedLabels}
          data={labelListData}
          isLoading={isLabelLoading}
          error={labelError}
        />
      </Suspense>
      <PostList data={postListData} isLoading={isLabelLoading || isPostLoading} error={postError} />
    </div>
  );
}
