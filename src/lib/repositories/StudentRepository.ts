import { GradedStudent } from "@/lib/models/GradedStudent";
import { Subject } from "@/lib/models/Subject";
import { prisma } from "@/lib/prisma";
import type { CreateStudentInput, UpdateStudentInput } from "@/types";
import { BaseRepository } from "./BaseRepository";

type PrismaStudentRow = {
  id: string;
  name: string;
  email: string;
  studentId: string;
  enrollmentDate: Date;
  createdAt: Date;
  updatedAt: Date;
  subjects: {
    id: string;
    name: string;
    score: number;
    weight: number;
    studentId: string;
  }[];
};

export class StudentRepository extends BaseRepository<GradedStudent> {
  private mapToModel(row: PrismaStudentRow): GradedStudent {
    const subjects = row.subjects.map(
      (s) => new Subject(s.name, s.score, s.weight),
    );
    return new GradedStudent(
      row.id,
      row.name,
      row.email,
      row.createdAt,
      row.studentId,
      row.enrollmentDate,
      subjects,
    );
  }

  async findAll(): Promise<GradedStudent[]> {
    const rows = await prisma.student.findMany({
      include: { subjects: true },
      orderBy: { createdAt: "desc" },
    });
    return (rows as PrismaStudentRow[]).map((r) => this.mapToModel(r));
  }

  async findById(id: string): Promise<GradedStudent | null> {
    const row = await prisma.student.findUnique({
      where: { id },
      include: { subjects: true },
    });
    if (!row) return null;
    return this.mapToModel(row as PrismaStudentRow);
  }

  async create(data: CreateStudentInput): Promise<GradedStudent> {
    const row = await prisma.student.create({
      data: {
        name: data.name,
        email: data.email,
        studentId: data.studentId,
        enrollmentDate: new Date(data.enrollmentDate),
        subjects: {
          create: data.subjects.map((s) => ({
            name: s.name,
            score: s.score,
            weight: s.weight,
          })),
        },
      },
      include: { subjects: true },
    });
    return this.mapToModel(row as PrismaStudentRow);
  }

  async update(id: string, data: UpdateStudentInput): Promise<GradedStudent> {
    const updateData: Record<string, unknown> = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.studentId !== undefined) updateData.studentId = data.studentId;
    if (data.enrollmentDate !== undefined)
      updateData.enrollmentDate = new Date(data.enrollmentDate);

    if (data.subjects !== undefined) {
      updateData.subjects = {
        deleteMany: {},
        create: data.subjects.map((s) => ({
          name: s.name,
          score: s.score,
          weight: s.weight,
        })),
      };
    }

    const row = await prisma.student.update({
      where: { id },
      data: updateData,
      include: { subjects: true },
    });
    return this.mapToModel(row as PrismaStudentRow);
  }

  async delete(id: string): Promise<void> {
    await prisma.student.delete({ where: { id } });
  }
}
