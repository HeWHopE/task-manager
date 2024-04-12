import { Test, TestingModule } from '@nestjs/testing'
import { BoardController } from '../../controllers/board.controller'
import { Board } from 'src/entities/Board.entity'
import { BoardService } from '../../services/board.service'

describe('BoardController', () => {
  let controller: BoardController
  let service: BoardService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [BoardController],
      providers: [
        {
          provide: BoardService,
          useValue: {
            getAllBoards: jest.fn(),
            getBoardById: jest.fn(),
            createBoard: jest.fn(),
            updateBoard: jest.fn(),
            deleteBoard: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = moduleRef.get<BoardController>(BoardController)
    service = moduleRef.get<BoardService>(BoardService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('getAllTaskLists', () => {
    it('should return all boards', async () => {
      const mockBoards: Board[] = [{ id: 1, name: 'Board 1', lists: [] }]
      jest.spyOn(service, 'getAllBoards').mockResolvedValue(mockBoards)

      expect(await controller.getAllTaskLists()).toEqual(mockBoards)
    })
  })
})
