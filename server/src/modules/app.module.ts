import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ListModule } from './list.module'
import { TaskModule } from './task.module'
import { ActivityLogModule } from './activity-log.module'
import * as dotenv from 'dotenv'
import { Task } from '../entities/task.entity'
import { ActivityLog } from '../entities/activity-log.entity'
import { Board } from 'src/entities/Board.entity'
import { TaskList } from 'src/entities/taskList.entity'
import { BoardModule } from './board-module'

dotenv.config()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',

      entities: [TaskList, Task, ActivityLog, Board],
      synchronize: true,
      ssl: false,
    }),

    BoardModule,
    ListModule,
    TaskModule,
    ActivityLogModule,
  ],
})
export class AppModule {}
