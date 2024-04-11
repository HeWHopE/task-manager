import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListModule } from './list.module';
import { TaskModule } from './task.module';
import { ActivityLogModule } from './activity-log.module';
import * as dotenv from 'dotenv';
import { Task } from '../entities/task.entity';
import { ActivityLog } from '../entities/activity-log.entity';
import { Board } from 'src/entities/Board.entity';
import { TaskList } from 'src/entities/taskList.entity';
import { BoardModule } from './board-module';


dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "ep-rapid-pine-a408ai3j-pooler.us-east-1.aws.neon.tech",
      port: 5432,
      username: "default",
      password: "UfqT6QYNxaI1",
      database: "verceldb",

      entities: [TaskList, Task, ActivityLog, Board],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    
    BoardModule,
    ListModule,
    TaskModule,
    ActivityLogModule,
  ],
})
export class AppModule {}

