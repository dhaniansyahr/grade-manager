import Link from "next/link";
import { GpaDisplay } from "@/components/grades/GpaDisplay";
import type { StudentResponse } from "@/types";
import { DeleteButton } from "./DeleteButton";

interface StudentListProps {
  students: StudentResponse[];
}

export function StudentList({ students }: StudentListProps) {
  return (
    <div className="flex flex-col gap-3">
      {students.map((student) => (
        <div
          key={student.id}
          className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
        >
          <div className="flex flex-col gap-1 min-w-0">
            <Link
              href={`/students/${student.id}`}
              className="text-base font-semibold text-blue-600 hover:underline truncate"
            >
              {student.name}
            </Link>
            <p className="text-sm text-zinc-500 truncate">
              {student.email} · {student.studentId}
            </p>
            <p className="text-xs text-zinc-400">
              {student.subjects.length} subject
              {student.subjects.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-4">
            <GpaDisplay gpa={student.gpa} />
            <Link
              href={`/students/${student.id}/edit`}
              className="text-sm text-zinc-500 hover:text-zinc-800 font-medium"
            >
              Edit
            </Link>
            <DeleteButton studentId={student.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
