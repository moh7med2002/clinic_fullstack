import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { paymentProviders } from './payment.providers';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, ...paymentProviders],
  exports: [PaymentService],
})
export class PaymentModule {}
