import { Injectable } from '@nestjs/common';
import { TPaginationArgs } from '@uninus/entities';
import { PrismaService } from '../prisma/index';
import { paginate } from '@uninus/utilities';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getUser({ where, orderBy, page }: TPaginationArgs) {
    return paginate(
      this.prisma.users,
      {
        where,
        orderBy,
      },
      {
        page,
      }
    );
  }
}
