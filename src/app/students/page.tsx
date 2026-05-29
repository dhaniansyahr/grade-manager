import Link from "next/link";
import { StudentList } from "@/components/students/StudentList";
import { Button } from "@/components/ui/Button";
import { StudentService } from "@/lib/services/StudentService";

export default async function StudentsPage() {
  const service = new StudentService();
  const students = await service.getAllStudents();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">Students</h1>
        <Link href="/students/new">
          <Button>Add Student</Button>
        </Link>
      </div>
      {students.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-12 text-center">
          <p className="text-zinc-500">
            No students yet.{" "}
            <Link
              href="/students/new"
              className="text-blue-600 hover:underline font-medium"
            >
              Add your first student
            </Link>{" "}
            to get started.
          </p>
        </div>
      ) : (
        <StudentList students={students} />
      )}
    </div>
  );
}
