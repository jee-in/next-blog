import LabelButton from "@/features/post-list/ui/list-header/label-button/LabelButton";
import { Label } from "@/shared/types/api/github";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LabelButtonSkeleton from "./label-button-skeleton/LabelButtonSkeleton";

interface PostfilterProps {
  selectedLabels: Set<string>;
  setSelectedLabels: (labels: Set<string>) => void;
  data: Label[] | undefined;
  isLoading: boolean;
  error: unknown;
}

export default function Postfilter({
  selectedLabels,
  setSelectedLabels,
  data,
  isLoading,
  error,
}: PostfilterProps) {
  const searchParams = useSearchParams();
  const [checkedLabels, setCheckedLabels] = useState<Set<string>>(selectedLabels);

  useEffect(() => {
    setSelectedLabels(new Set(searchParams.getAll("labels")));
  }, [searchParams, setSelectedLabels]);

  useEffect(() => {
    setCheckedLabels(new Set(selectedLabels));
  }, [selectedLabels]);

  const handleLabelClick = (labelName: string) => {
    const nextLabels = new Set(checkedLabels);
    if (nextLabels.has(labelName)) {
      nextLabels.delete(labelName);
    } else {
      nextLabels.add(labelName);
    }
    setCheckedLabels(nextLabels);

    const newParams = new URLSearchParams();
    nextLabels.forEach((label) => newParams.append("labels", label));
    history.replaceState(null, "", `?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-wrap">
      {isLoading ? (
        new Array(3).fill(1).map((_, index) => <LabelButtonSkeleton key={index} />)
      ) : error ? (
        <p className="text-red-500">라벨을 불러올 수 없습니다.</p>
      ) : (
        data?.map((label) => (
          <LabelButton
            key={label.id}
            label={label.name}
            checked={checkedLabels.has(label.name)}
            onToggle={() => handleLabelClick(label.name)}
          />
        ))
      )}
    </div>
  );
}
