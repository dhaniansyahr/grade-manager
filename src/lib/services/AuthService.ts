import bcrypt from "bcryptjs";
import { UserRepository } from "@/lib/repositories/UserRepository";
import { signToken } from "@/lib/auth";
import type { RegisterInput, LoginInput, AuthResponse } from "@/types";

export class AuthService {
  private repo = new UserRepository();

  async register(input: RegisterInput): Promise<AuthResponse> {
    const existing = await this.repo.findByEmail(input.email);
    if (existing) throw new Error("Email already registered");

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await this.repo.create({
      name: input.name,
      email: input.email,
      passwordHash,
    });

    const token = signToken({ sub: user.id, email: user.email, name: user.name });
    return { token, user: { id: user.id, name: user.name, email: user.email } };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await this.repo.findByEmail(input.email);
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(input.password, user.passwordHash);
    if (!valid) throw new Error("Invalid credentials");

    const token = signToken({ sub: user.id, email: user.email, name: user.name });
    return { token, user: { id: user.id, name: user.name, email: user.email } };
  }

  async getUserById(id: string) {
    const user = await this.repo.findById(id);
    if (!user) return null;
    return { id: user.id, name: user.name, email: user.email };
  }
}
