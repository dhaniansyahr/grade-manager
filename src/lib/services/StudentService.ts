import type { GradedStudent } from "@/lib/models/GradedStudent";
import type { Subject } from "@/lib/models/Subject";
import { StudentRepository } from "@/lib/repositories/StudentRepository";
import type {
  ClassStats,
  CreateStudentInput,
  StudentResponse,
  SubjectResponse,
  UpdateStudentInput,
} from "@/types";
import { BaseService } from "./BaseService";

function toSubjectResponse(subject: Subject, idx: number): SubjectResponse {
  return {
    id: `${idx}`,
    name: subject.name,
    score: subject.score,
    weight: subject.weight,
    letterGrade: subject.getLetterGrade(),
    weightedScore: subject.getWeightedScore(),
  };
}

function toStudentResponse(student: GradedStudent): StudentResponse {
  return {
    id: student.id,
    name: student.name,
    email: student.email,
    studentId: student.studentId,
    enrollmentDate: student.enrollmentDate.toISOString(),
    createdAt: student.createdAt.toISOString(),
    subjects: student.subjects.map((s, i) => toSubjectResponse(s, i)),
    gpa: student.computeGPA(),
  };
}

export class StudentService extends BaseService<GradedStudent> {
  constructor() {
    super(new StudentRepository());
  }

  async getAllStudents(): Promise<StudentResponse[]> {
    const students = await this.repository.findAll();
    return students.map(toStudentResponse);
  }

  async getStudentById(id: string): Promise<StudentResponse | null> {
    const student = await this.repository.findById(id);
    if (!student) return null;
    return toStudentResponse(student);
  }

  async createStudent(data: CreateStudentInput): Promise<StudentResponse> {
    const student = await this.repository.create(data);
    return toStudentResponse(student);
  }

  async updateStudent(
    id: string,
    data: UpdateStudentInput,
  ): Promise<StudentResponse> {
    const student = await this.repository.update(id, data);
    return toStudentResponse(student);
  }

  async deleteStudent(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  calculateGPA(subjects: Subject[]): number {
    if (subjects.length === 0) return 0;

    let totalWeightedPoints = 0;
    let totalWeight = 0;

    for (const subject of subjects) {
      const letter = subject.getLetterGrade();
      let gradePoints: number;

      if (letter === "A") {
        gradePoints = 4.0;
      } else if (letter === "B") {
        gradePoints = 3.0;
      } else if (letter === "C") {
        gradePoints = 2.0;
      } else if (letter === "D") {
        gradePoints = 1.0;
      } else {
        gradePoints = 0.0;
      }

      totalWeightedPoints += gradePoints * subject.weight;
      totalWeight += subject.weight;
    }

    return totalWeight === 0 ? 0 : totalWeightedPoints / totalWeight;
  }

  async getClassStats(): Promise<ClassStats> {
    const students = await this.repository.findAll();

    if (students.length === 0) {
      return {
        subjectAverages: [],
        highestGpaStudent: null,
        lowestGpaStudent: null,
        totalStudents: 0,
      };
    }

    const subjectMap = new Map<string, { total: number; count: number }>();
    let highestGpa = -1;
    let lowestGpa = Number.POSITIVE_INFINITY;
    let highestStudent: GradedStudent | null = null;
    let lowestStudent: GradedStudent | null = null;

    for (const student of students) {
      const gpa = student.computeGPA();

      if (gpa > highestGpa) {
        highestGpa = gpa;
        highestStudent = student;
      }
      if (gpa < lowestGpa) {
        lowestGpa = gpa;
        lowestStudent = student;
      }

      for (const subject of student.subjects) {
        const existing = subjectMap.get(subject.name);
        if (existing) {
          existing.total += subject.score;
          existing.count += 1;
        } else {
          subjectMap.set(subject.name, { total: subject.score, count: 1 });
        }
      }
    }

    const subjectAverages = Array.from(subjectMap.entries()).map(
      ([subjectName, { total, count }]) => ({
        subjectName,
        averageScore: Math.round((total / count) * 100) / 100,
      }),
    );

    return {
      subjectAverages,
      highestGpaStudent: highestStudent
        ? toStudentResponse(highestStudent)
        : null,
      lowestGpaStudent: lowestStudent ? toStudentResponse(lowestStudent) : null,
      totalStudents: students.length,
    };
  }
}
