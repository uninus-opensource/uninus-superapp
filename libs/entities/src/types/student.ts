import { Prisma } from '@prisma/client';

export type TUpsertStudent = {
  where: Prisma.StudentsWhereUniqueInput;
  update: Prisma.StudentsUpdateInput;
  create: Prisma.StudentsCreateInput;
};
