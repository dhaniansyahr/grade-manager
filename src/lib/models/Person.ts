export class Person {
  protected readonly _name: string;
  protected readonly _email: string;
  protected readonly _createdAt: Date;

  constructor(name: string, email: string, createdAt: Date) {
    this._name = name;
    this._email = email;
    this._createdAt = createdAt;
  }

  get name(): string {
    return this._name;
  }
  get email(): string {
    return this._email;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
}
