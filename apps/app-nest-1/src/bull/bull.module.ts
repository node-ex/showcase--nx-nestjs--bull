import { Module } from '@nestjs/common';
import { BullController } from './bull.controller';
import { BullService } from './bull.service';
import { BullModule as _BullModule } from '@nestjs/bull';
import { MY_TASK_QUEUE_NAME } from './bull.constants';
import { MyTaskQueueConsumer } from './my-task-queue.consumer';

@Module({
  imports: [
    _BullModule.forRootAsync({
      useFactory: () => {
        const mandatoryCredentials = [
          process.env['REDIS_HOST'],
          process.env['REDIS_PORT'],
        ];
        if (mandatoryCredentials.some((cred) => !cred)) {
          throw new Error('Missing mandatory Redis credentials');
        }
        const [host, portString] = mandatoryCredentials as [string, string];
        const password = process.env['REDIS_PASSWORD'];
        if (portString.match(/\D/)) {
          throw new Error('Invalid Redis port');
        }
        const port = parseInt(portString);
        return {
          redis: {
            host,
            port,
            ...(password && { password }),
          },
        };
      },
    }),
    _BullModule.registerQueue({
      name: MY_TASK_QUEUE_NAME,
      defaultJobOptions: {
        // removeOnComplete: true,
        // removeOnFail: true,
      },
    }),
  ],
  controllers: [BullController],
  providers: [BullService, MyTaskQueueConsumer],
})
export class BullModule {}
