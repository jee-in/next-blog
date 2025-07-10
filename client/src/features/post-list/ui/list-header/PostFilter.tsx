import LabelButton from "@/features/post-list/ui/list-header/label-button/LabelButton";
import { Label } from "@/shared/types/api/github";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PostfilterProps {
  allLabels: Label[] | undefined;
  selectedLabels: Set<string>;
  setSelectedLabels: (labels: Set<string>) => void;
}

export default function Postfilter({
  allLabels,
  selectedLabels,
  setSelectedLabels,
}: PostfilterProps) {
  const searchParams = useSearchParams();
  const [checkedLabels, setCheckedLabels] = useState<Set<string>>(selectedLabels);

  useEffect(() => {
    setSelectedLabels(new Set(searchParams.getAll("labels")));
  }, [searchParams, setSelectedLabels]);

  useEffect(() => {
    setCheckedLabels(new Set(selectedLabels));
  }, [selectedLabels]);

  const updateLabels = (labels: Set<string>) => {
    const newParams = new URLSearchParams();
    labels.forEach((label) => newParams.append("labels", label));
    history.replaceState(null, "", `?${newParams.toString()}`);
  };

  const handleLabelClick = (labelName: string) => {
    const nextLabels = new Set(checkedLabels);
    if (nextLabels.has(labelName)) {
      nextLabels.delete(labelName);
    } else {
      nextLabels.add(labelName);
    }
    setCheckedLabels(nextLabels);
    updateLabels(nextLabels);
  };

  return (
    <div className="h-10">
      {allLabels?.map((label) => (
        <LabelButton
          key={label.id}
          label={label.name}
          checked={checkedLabels.has(label.name)}
          onToggle={() => handleLabelClick(label.name)}
        />
      ))}
    </div>
  );
}
