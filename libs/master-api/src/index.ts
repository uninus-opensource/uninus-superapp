import { Module } from '@nestjs/common';
import {
  AuthModule,
  PmbModule,
  PrismaModule,
  StudentModule,
  UserModule,
} from '@uninus/modules';

@Module({
  imports: [PrismaModule, AuthModule, PmbModule, StudentModule, UserModule],
  controllers: [],
  providers: [],
})
export class MasterApi {}
