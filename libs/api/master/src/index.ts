import { Module } from '@nestjs/common';
import { PrismaModule } from '@uninus/api/models';
import {
  AuthModule,
  LocationModule,
  PmbModule,
  StudentModule,
  UserModule,
} from '@uninus/api/modules';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    PmbModule,
    StudentModule,
    UserModule,
    LocationModule,
  ],
  controllers: [],
  providers: [],
})
export class MasterApi {}
