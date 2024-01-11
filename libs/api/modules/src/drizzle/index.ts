import { Global, Module } from "@nestjs/common";
import { ConfigService, ConfigModule } from "@nestjs/config";

import { Client } from "pg";
import * as schema from "@uninus/api/models";
import { drizzle } from "drizzle-orm/node-postgres";

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: "drizzle",
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>("DATABASE_URL");

        const client = new Client({
          connectionString,
        });
        await client.connect();

        return drizzle(client, { schema });
      },
    },
  ],
  exports: [`drizzle`],
})
export class DrizzleModule {}
