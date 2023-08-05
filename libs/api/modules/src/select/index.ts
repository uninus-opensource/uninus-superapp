import { Module } from "@nestjs/common";
import { SelectController } from "@uninus/api/controllers";
import { PrismaModule } from "@uninus/api/models";
import { ClientsModule, Transport } from "@nestjs/microservices"

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'PMB_SERVICE',
        transport: Transport.REDIS,
        options:{
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT),
          password: process.env.REDIS_PASSWORD,
          username: process.env.REDIS_USERNAME,
        }
      }
    ]),
  ],
  controllers: [SelectController],
  providers: [],
})
export class SelectModule {}
