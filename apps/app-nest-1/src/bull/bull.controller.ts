import { Controller, Get, Post } from '@nestjs/common';
import { BullService } from './bull.service';

@Controller('bull')
export class BullController {
  constructor(private readonly bullService: BullService) {}

  @Get()
  async getData() {
    const jobs = await this.bullService.getAll();

    return {
      jobs,
    };
  }

  @Post()
  addData() {
    return this.bullService.add();
  }
}
