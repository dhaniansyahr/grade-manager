import type { UserModel } from "@/generated/prisma/models/User";
import { prisma } from "@/lib/prisma";
import { BaseRepository } from "./BaseRepository";

export class UserRepository extends BaseRepository<UserModel> {
  async findAll(): Promise<UserModel[]> {
    return prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  }

  async findById(id: string): Promise<UserModel | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(data: { name: string; email: string; passwordHash: string }): Promise<UserModel> {
    return prisma.user.create({ data });
  }

  async update(id: string, data: Partial<{ name: string; email: string; passwordHash: string }>): Promise<UserModel> {
    return prisma.user.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
