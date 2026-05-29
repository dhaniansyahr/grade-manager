import { Person } from "./Person";

export class Student extends Person {
  protected readonly _studentId: string;
  protected readonly _enrollmentDate: Date;

  constructor(
    name: string,
    email: string,
    createdAt: Date,
    studentId: string,
    enrollmentDate: Date,
  ) {
    super(name, email, createdAt);
    this._studentId = studentId;
    this._enrollmentDate = enrollmentDate;
  }

  get studentId(): string {
    return this._studentId;
  }
  get enrollmentDate(): Date {
    return this._enrollmentDate;
  }
}
