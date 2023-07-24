import { Module } from '@nestjs/common';
import { PrismaModule } from '@uninus/models';
import {
  AuthModule,
  PmbModule,
  StudentModule,
  UserModule,
  LocationModule,
} from '@uninus/modules';

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
