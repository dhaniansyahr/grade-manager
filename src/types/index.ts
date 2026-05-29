export interface SubjectInput {
  name: string;
  score: number;
  weight: number;
}

export interface CreateStudentInput {
  name: string;
  email: string;
  studentId: string;
  enrollmentDate: string;
  subjects: SubjectInput[];
}

export interface UpdateStudentInput {
  name?: string;
  email?: string;
  studentId?: string;
  enrollmentDate?: string;
  subjects?: SubjectInput[];
}

export interface SubjectResponse {
  id: string;
  name: string;
  score: number;
  weight: number;
  letterGrade: "A" | "B" | "C" | "D" | "F";
  weightedScore: number;
}

export interface StudentResponse {
  id: string;
  name: string;
  email: string;
  studentId: string;
  enrollmentDate: string;
  createdAt: string;
  subjects: SubjectResponse[];
  gpa: number;
}

export interface SubjectAverage {
  subjectName: string;
  averageScore: number;
}

export interface ClassStats {
  subjectAverages: SubjectAverage[];
  highestGpaStudent: StudentResponse | null;
  lowestGpaStudent: StudentResponse | null;
  totalStudents: number;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
}

export interface StringMatcherInput {
  input1: string;
  input2: string;
  caseSensitive: boolean;
}

export interface StringMatcherResponse {
  matchPercentage: number;
  input1: string;
  input2: string;
  caseSensitive: boolean;
}
