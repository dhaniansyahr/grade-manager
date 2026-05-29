import Link from "next/link";
import { notFound } from "next/navigation";
import { GpaDisplay } from "@/components/grades/GpaDisplay";
import { GradeBreakdownTable } from "@/components/grades/GradeBreakdownTable";
import { DeleteButton } from "@/components/students/DeleteButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StudentService } from "@/lib/services/StudentService";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StudentDetailPage({ params }: PageProps) {
  const { id } = await params;
  const service = new StudentService();
  const student = await service.getStudentById(id);

  if (!student) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">{student.name}</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {student.email} · {student.studentId}
          </p>
          <p className="text-xs text-zinc-400 mt-0.5">
            Enrolled:{" "}
            {new Date(student.enrollmentDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/students/${student.id}/edit`}>
            <Button variant="secondary" size="sm">
              Edit
            </Button>
          </Link>
          <DeleteButton studentId={student.id} />
        </div>
      </div>

      <div className="mb-6">
        <GpaDisplay gpa={student.gpa} size="lg" />
      </div>

      <Card title="Subject Breakdown">
        <GradeBreakdownTable subjects={student.subjects} />
      </Card>

      <div className="mt-4">
        <Link
          href="/students"
          className="text-sm text-zinc-500 hover:text-zinc-800"
        >
          ← Back to students
        </Link>
      </div>
    </div>
  );
}
