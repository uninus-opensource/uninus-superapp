import { Injectable } from "@nestjs/common";
import { PrismaService } from "@uninus/api/services";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
}
