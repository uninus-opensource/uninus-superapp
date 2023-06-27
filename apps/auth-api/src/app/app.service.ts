import { Injectable } from '@nestjs/common';
import { PrismaService } from '@uninus/services';
import { MetaPrefix } from '@uninus/utilities';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getUser() {
    const userData = this.prisma.users.findMany();
    const data = await userData;
    return MetaPrefix(data);
  }
}
