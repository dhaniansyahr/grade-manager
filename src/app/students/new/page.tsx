import { StudentForm } from "@/components/students/StudentForm";

export default function NewStudentPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900">Add Student</h1>
      <StudentForm mode="create" />
    </div>
  );
}
