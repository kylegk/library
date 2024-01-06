import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model, isValidObjectId } from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    const search = this.buildSearchQuery(query);

    const currentPage = Number(query.page) ?? 1;
    const limit = Number(query.limit) || 10;
    const skip = limit * (currentPage - 1);

    return await this.bookModel
      .find({ ...search })
      .limit(limit)
      .skip(skip);
  }

  async findById(id: string): Promise<Book> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException();
    }

    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException();
    }
    return book;
  }

  async create(book: Book): Promise<Book> {
    return await this.bookModel.create(book);
  }

  async update(id: string, book: Book): Promise<Book> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException();
    }

    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException();
    }

    await this.bookModel.findByIdAndDelete(id);
  }

  private buildSearchQuery(query: Query): object {
    const acceptedSearchTerms = ['title', 'author'];
    let searchTerms = {};
    for (const term in query) {
      if (acceptedSearchTerms.includes(term)) {
        searchTerms = {
          ...searchTerms,
          ...{ [term]: { $regex: query[term], $options: 'i' } },
        };
      }
    }

    return searchTerms;
  }
}
