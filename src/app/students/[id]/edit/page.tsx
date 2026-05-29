import { notFound } from "next/navigation";
import { StudentForm } from "@/components/students/StudentForm";
import { StudentService } from "@/lib/services/StudentService";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditStudentPage({ params }: PageProps) {
  const { id } = await params;
  const service = new StudentService();
  const student = await service.getStudentById(id);

  if (!student) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900">Edit Student</h1>
      <StudentForm
        mode="edit"
        initialData={{
          id: student.id,
          name: student.name,
          email: student.email,
          studentId: student.studentId,
          enrollmentDate: student.enrollmentDate.split("T")[0],
          subjects: student.subjects.map((s) => ({
            name: s.name,
            score: s.score,
            weight: s.weight,
          })),
        }}
      />
    </div>
  );
}
