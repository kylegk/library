import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Post('book/add')
  async createBook(
    @Body()
    book: CreateBookDto,
  ): Promise<Book> {
    return this.bookService.create(book);
  }

  @Get('book/details/:id')
  async getBookDetails(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.bookService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('book/update/:id')
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.update(id, book);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('book/remove/:id')
  async removeBook(
    @Param('id')
    id: string,
  ): Promise<void> {
    return this.bookService.remove(id);
  }
}
