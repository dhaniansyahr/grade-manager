"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { SubjectInput } from "@/types";

interface SubjectRowProps {
  subject: SubjectInput;
  index: number;
  onChange: (updated: SubjectInput) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export function SubjectRow({
  subject,
  index,
  onChange,
  onRemove,
  canRemove,
}: SubjectRowProps) {
  return (
    <div className="flex items-end gap-2">
      <div className="flex-1">
        <Input
          label={`Subject ${index + 1}`}
          value={subject.name}
          onChange={(e) => onChange({ ...subject, name: e.target.value })}
          required
        />
      </div>
      <div className="w-24">
        <Input
          label="Score"
          type="number"
          min={0}
          max={100}
          value={subject.score}
          onChange={(e) =>
            onChange({ ...subject, score: Number(e.target.value) })
          }
          required
        />
      </div>
      <div className="w-24">
        <Input
          label="Weight"
          type="number"
          min={1}
          step={1}
          value={subject.weight}
          onChange={(e) =>
            onChange({ ...subject, weight: Number(e.target.value) })
          }
          required
        />
      </div>
      {canRemove && (
        <Button
          variant="danger"
          size="sm"
          onClick={onRemove}
          className="mb-0.5 shrink-0"
        >
          Remove
        </Button>
      )}
    </div>
  );
}
