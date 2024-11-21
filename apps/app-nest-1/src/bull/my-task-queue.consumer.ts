import { Process, Processor } from '@nestjs/bull';
import { MY_TASK_NAME, MY_TASK_QUEUE_NAME } from './bull.constants';
import { MyTaskDataType } from './my-task-data-type.interface';
import { MyTaskReturnType } from './my-task-return-type.type';
import { Job } from 'bull';

@Processor(MY_TASK_QUEUE_NAME)
export class MyTaskQueueConsumer {
  @Process(MY_TASK_NAME)
  async [MY_TASK_NAME](job: Job<MyTaskDataType>): Promise<MyTaskReturnType> {
    console.log('Processing job', job.name, job.data);
    return Promise.resolve(undefined);
  }
}
