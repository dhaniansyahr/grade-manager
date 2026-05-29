export class Subject {
  private readonly _name: string;
  private readonly _score: number;
  private readonly _weight: number;

  constructor(name: string, score: number, weight: number) {
    this._name = name;
    this._score = score;
    this._weight = weight;
  }

  get name(): string {
    return this._name;
  }
  get score(): number {
    return this._score;
  }
  get weight(): number {
    return this._weight;
  }

  getLetterGrade(): "A" | "B" | "C" | "D" | "F" {
    if (this._score >= 90) {
      return "A";
    } else if (this._score >= 80) {
      return "B";
    } else if (this._score >= 70) {
      return "C";
    } else if (this._score >= 60) {
      return "D";
    } else {
      return "F";
    }
  }

  getWeightedScore(): number {
    return this._score * this._weight;
  }
}
