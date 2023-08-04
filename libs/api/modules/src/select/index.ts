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
          host: 'localhost',
          port: 6379
        }
      }
    ]),
  ],
  controllers: [SelectController],
  providers: [],
})
export class SelectModule {}
