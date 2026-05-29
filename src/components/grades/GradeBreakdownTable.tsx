import type { ReactNode } from "react";
import { Table } from "@/components/ui/Table";
import type { SubjectResponse } from "@/types";

interface GradeBreakdownTableProps {
  subjects: SubjectResponse[];
}

const gradeColors: Record<string, string> = {
  A: "bg-green-100 text-green-700",
  B: "bg-blue-100 text-blue-700",
  C: "bg-yellow-100 text-yellow-700",
  D: "bg-orange-100 text-orange-700",
  F: "bg-red-100 text-red-700",
};

export function GradeBreakdownTable({ subjects }: GradeBreakdownTableProps) {
  return (
    <Table
      data={subjects}
      keyExtractor={(s) => s.id}
      emptyMessage="No subjects recorded"
      columns={[
        { header: "Subject", accessor: "name" },
        { header: "Score", accessor: (s): ReactNode => `${s.score}/100` },
        { header: "Weight", accessor: "weight" },
        {
          header: "Weighted Score",
          accessor: (s): ReactNode => s.weightedScore.toFixed(2),
        },
        {
          header: "Grade",
          accessor: (s): ReactNode => (
            <span
              className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${gradeColors[s.letterGrade] ?? ""}`}
            >
              {s.letterGrade}
            </span>
          ),
        },
      ]}
    />
  );
}
