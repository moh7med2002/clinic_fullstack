import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { adminProviders } from './admin.provider';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [AdminService, ...adminProviders],
})
export class AdminModule {}
