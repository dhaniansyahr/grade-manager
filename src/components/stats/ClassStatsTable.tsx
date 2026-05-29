import type { ReactNode } from "react";
import { Table } from "@/components/ui/Table";
import type { SubjectAverage } from "@/types";

interface ClassStatsTableProps {
  subjectAverages: SubjectAverage[];
}

export function ClassStatsTable({ subjectAverages }: ClassStatsTableProps) {
  return (
    <Table
      data={subjectAverages}
      keyExtractor={(s) => s.subjectName}
      emptyMessage="No subject data yet"
      columns={[
        { header: "Subject", accessor: "subjectName" },
        {
          header: "Class Average",
          accessor: (s): ReactNode => `${s.averageScore.toFixed(1)} / 100`,
        },
      ]}
    />
  );
}
