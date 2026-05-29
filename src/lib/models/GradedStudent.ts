import { Student } from "./Student";
import type { Subject } from "./Subject";

export class GradedStudent extends Student {
  private readonly _id: string;
  private readonly _subjects: Subject[];

  constructor(
    id: string,
    name: string,
    email: string,
    createdAt: Date,
    studentId: string,
    enrollmentDate: Date,
    subjects: Subject[],
  ) {
    super(name, email, createdAt, studentId, enrollmentDate);
    this._id = id;
    this._subjects = subjects;
  }

  get id(): string {
    return this._id;
  }
  get subjects(): Subject[] {
    return this._subjects;
  }

  computeGPA(): number {
    if (this._subjects.length === 0) return 0;

    let totalWeightedPoints = 0;
    let totalWeight = 0;

    for (const subject of this._subjects) {
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
}
