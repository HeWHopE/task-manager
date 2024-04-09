import { Test, TestingModule } from '@nestjs/testing';
import { ActivityLogController } from '../../controllers/activity-log.controller';
import { ActivityLogService } from '../../services/activity-log.service';
import { ActivityLog } from 'src/entities/activity-log.entity';

describe('ActivityLogController', () => {
  let controller: ActivityLogController;
  let service: ActivityLogService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ActivityLogController],
      providers: [
        {
          provide: ActivityLogService,
          useValue: {
            getActivityLogs: jest.fn(),
            getActivityLogsByBoardId: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get<ActivityLogController>(ActivityLogController);
    service = moduleRef.get<ActivityLogService>(ActivityLogService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getActivityLogs', () => {
    it('should return activity logs', async () => {
        const mockActivityLogs: ActivityLog[] = [
            { 
              id: 1, 
              action_type: 'Type 1',
              timestamp: new Date(),
              task_id: 123,
              board_id: 456,
              action_description: 'Log 1',
              list_id: 789, // Add appropriate value for list_id
              board: { id: 1, name: 'Board 1', lists: []} 
            },
            { 
              id: 2, 
              action_type: 'Type 2',
              timestamp: new Date(),
              task_id: 789,
              board_id: 456,
              action_description: 'Log 2',
              list_id: 789, // Add appropriate value for list_id
              board: { id: 1, name: 'Board 1', lists: []} 
            },
          ];
          
      jest.spyOn(service, 'getActivityLogs').mockResolvedValue(mockActivityLogs);

      expect(await controller.getActivityLogs()).toEqual(mockActivityLogs);
    });
  });

  describe('getActivityLogsByBoardId', () => {
    it('should return activity logs for a specific board', async () => {
      const boardId = 1;
      const mockActivityLogs: ActivityLog[] = [
        { 
          id: 1, 
          action_type: 'Type 1',
          timestamp: new Date(),
          task_id: 123,
          board_id: 456,
          action_description: 'Log 1',
          list_id: 789, // Add appropriate value for list_id
          board: { id: 1, name: 'Board 1', lists: []} 
        },
        { 
          id: 2, 
          action_type: 'Type 2',
          timestamp: new Date(),
          task_id: 789,
          board_id: 456,
          action_description: 'Log 2',
          list_id: 789, // Add appropriate value for list_id
          board: { id: 1, name: 'Board 1', lists: []} 
        },
      ];
      jest.spyOn(service, 'getActivityLogsByBoardId').mockResolvedValue(mockActivityLogs);

      expect(await controller.getActivityLogsByBoardId(boardId)).toEqual(mockActivityLogs);
    });
  });

});
