import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common'

import { Board } from '../entities/Board.entity'
import { BoardService } from '../services/board.service'

@Controller()
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('board')
  async getAllTaskLists() {
    return this.boardService.getAllBoards()
  }

  @Get('board/:id')
  async getBoardByID(@Param('id') id: number) {
    return this.boardService.getBoardById(id)
  }

  @Post('board')
  async createBoard(@Body() board: Board) {
    return this.boardService.createBoard(board)
  }

  @Put('board/:id')
  async updateBoard(@Param('id') id: number, @Body() board: Board) {
    return this.boardService.updateBoard(id, board)
  }

  @Delete('board/:id')
  async deleteBoard(@Param('id') id: number) {
    return this.boardService.deleteBoard(id)
  }

  @Get('/')
  async getBoard() {
    return 'SUp'
  }
}
