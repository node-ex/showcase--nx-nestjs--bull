import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { MY_TASK_NAME, MY_TASK_QUEUE_NAME } from './bull.constants';
import { MyTaskDataType } from './my-task-data-type.interface';

@Injectable()
export class BullService {
  constructor(
    @InjectQueue(MY_TASK_QUEUE_NAME)
    private myTaskQueue: Queue<MyTaskDataType>,
  ) {}

  async getAll() {
    const jobs = await this.myTaskQueue.getJobs([]);

    return jobs;
  }

  async add(): Promise<void> {
    await this.myTaskQueue.add(MY_TASK_NAME, {
      foo: 'bar',
    });
  }
}
