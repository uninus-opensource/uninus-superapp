// import { Inject, Injectable } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { and, eq, ilike, orm, Subquery, SQL } from "drizzle-orm";
// import { NodePgDatabase } from "drizzle-orm/node-postgres";
// import { SelectedFields, pgTable } from "drizzle-orm/pg-core";
// import * as schema from "@uninus/api/models";
// export interface GetDrizzleOptions {
//   select?: SelectedFields;
//   limit?: number;
//   offset?: number;
// }
// export type From = typeof pgTable | Subquery | SQL;
// @Injectable()
// export class DrizzleService {
//   constructor(@Inject("drizzle") private db: NodePgDatabase<typeof schema>) {}
//   async find<T extends GetDrizzleOptions>(table: From, props: T) {
//     return this.db
//       .select()
//       .from(table)
//       .where(eq(table[Object.keys(where)[0]], where[Object.values(where)[0]]));
//   }
//   // async findMany(table: T, where: T) {}
//   // async create(table: T, values: T["_"]["inferInsert"]) {}
//   // async createMany(table: T, set: T["_"]["inferInsert"]) {}
//   // async update(table: T, set: Partial<T["_"]["inferInsert"]>) {}
//   // async updateMany(table: T, set: Partial<T["_"]["inferInsert"]>) {}
//   // async delete(table: T, where: T) {}
//   // async deleteMany(table: T, where: T) {}
// }
