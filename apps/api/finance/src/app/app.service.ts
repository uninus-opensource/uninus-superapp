import { Injectable } from "@nestjs/common";
import { PrismaService } from "@uninus/api/models";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
}
