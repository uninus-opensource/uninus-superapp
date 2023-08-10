import { Module } from '@nestjs/common';
import { GeneralService } from './general.service';
import { GeneralController } from './general.controller';

@Module({
  providers: [GeneralService],
  controllers: [GeneralController]
})
export class GeneralModule {}
