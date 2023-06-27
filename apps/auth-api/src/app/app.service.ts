import { Injectable } from '@nestjs/common';
import { PrismaService } from '@uninus/services';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getUser() {
    const userData = this.prisma.users.findMany();
    return userData;
  }
}
