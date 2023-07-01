import { Module } from '@nestjs/common';
import {
  AuthModule,
  PmbModule,
  StudentModule,
  UserModule,
} from '@uninus/modules';

import { PrismaModule } from '@uninus/models';

@Module({
  imports: [PrismaModule, AuthModule, PmbModule, StudentModule, UserModule],
  controllers: [],
  providers: [],
})
export class MasterApi {}
