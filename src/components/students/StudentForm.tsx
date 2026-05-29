"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { CreateStudentInput, SubjectInput } from "@/types";
import { SubjectRow } from "./SubjectRow";

interface StudentFormProps {
  initialData?: Partial<CreateStudentInput> & { id?: string };
  mode: "create" | "edit";
}

export function StudentForm({ initialData, mode }: StudentFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name ?? "");
  const [email, setEmail] = useState(initialData?.email ?? "");
  const [studentId, setStudentId] = useState(initialData?.studentId ?? "");
  const [enrollmentDate, setEnrollmentDate] = useState(
    initialData?.enrollmentDate ?? "",
  );
  const [subjects, setSubjects] = useState<SubjectInput[]>(
    initialData?.subjects && initialData.subjects.length > 0
      ? initialData.subjects
      : [{ name: "", score: 0, weight: 1 }],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addSubject = () =>
    setSubjects((prev) => [...prev, { name: "", score: 0, weight: 1 }]);

  const removeSubject = (index: number) =>
    setSubjects((prev) => prev.filter((_, i) => i !== index));

  const updateSubject = (index: number, updated: SubjectInput) =>
    setSubjects((prev) => prev.map((s, i) => (i === index ? updated : s)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload: CreateStudentInput = {
      name,
      email,
      studentId,
      enrollmentDate,
      subjects,
    };

    const url =
      mode === "create" ? "/api/students" : `/api/students/${initialData?.id}`;
    const method = mode === "create" ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(
          typeof err.error === "string" ? err.error : "Unknown error",
        );
      }
      router.push("/students");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-xl">
      <Input
        label="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        required
      />
      <Input
        label="Enrollment Date"
        type="date"
        value={enrollmentDate}
        onChange={(e) => setEnrollmentDate(e.target.value)}
        required
      />

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-zinc-700">Subjects</h3>
        {subjects.map((subject, i) => (
          <SubjectRow
            key={`subject-${
              // biome-ignore lint/suspicious/noArrayIndexKey: order matters for form fields
              i
            }`}
            subject={subject}
            index={i}
            onChange={(updated) => updateSubject(i, updated)}
            onRemove={() => removeSubject(i)}
            canRemove={subjects.length > 1}
          />
        ))}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={addSubject}
          className="self-start"
        >
          + Add Subject
        </Button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : mode === "create"
              ? "Create Student"
              : "Update Student"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
