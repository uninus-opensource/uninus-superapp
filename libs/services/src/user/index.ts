import { Injectable } from '@nestjs/common';
import { TPaginationArgs } from '@uninus/entities';
import { paginate } from '@uninus/utilities';
import { PrismaService } from '../prisma/index';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getUser({ where, orderBy, page, perPage }: TPaginationArgs) {
    return paginate(
      this.prisma.users,
      {
        where,
        orderBy,
      },
      {
        page,
        perPage,
      }
    );
  }
}
