import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose, { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('BookService', () => {
  let service: BookService;
  let model: Model<Book>;

  const mockBookService = {
    findById: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  const mockBook = {
    _id: '65977a0b092b56923089a8bd',
    isbn: '1-2345-6789-123',
    title: 'Book Title',
    author: 'Book Author',
    description: 'Book Description',
    publisher: 'Book Publisher',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: getModelToken(Book.name), useValue: mockBookService },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    model = module.get<Model<Book>>(getModelToken(Book.name));
  });

  describe('findById', () => {
    it('should find a book by Id', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockBook);
      const result = await service.findById(mockBook._id);
      expect(model.findById).toHaveBeenCalledWith(mockBook._id);
      expect(result).toEqual(mockBook);
    });

    it('should throw BadRequestExepction if an invalid book Id is provided', async () => {
      const id = 'this-is-an-invalid-id';

      const isValidObjectIdMock = jest
        .spyOn(mongoose, 'isValidObjectId')
        .mockReturnValue(false);

      await expect(service.findById(id)).rejects.toThrow(BadRequestException);
      expect(isValidObjectIdMock).toHaveBeenCalledWith(id);
      isValidObjectIdMock.mockRestore();
    });

    it('should throw NotFoundException if a book Id is not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(null);
      await expect(service.findById(mockBook._id)).rejects.toThrow(
        NotFoundException,
      );
      expect(model.findById).toHaveBeenCalledWith(mockBook._id);
    });
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      jest.spyOn(model, 'find').mockImplementation(
        () =>
          ({
            limit: () => ({
              skip: jest.fn().mockResolvedValue([mockBook]),
            }),
          }) as any,
      );

      const result = await service.findAll({});
      expect(model.find).toHaveBeenCalledWith({});
      expect(result).toEqual([mockBook]);
    });

    it('should return an array of books matching a query', async () => {
      const query = { title: 'title', author: 'author' };
      jest.spyOn(model, 'find').mockImplementation(
        () =>
          ({
            limit: () => ({
              skip: jest.fn().mockResolvedValue([mockBook]),
            }),
          }) as any,
      );

      const result = await service.findAll(query);
      expect(model.find).toHaveBeenCalledWith({
        title: { $regex: 'title', $options: 'i' },
        author: { $regex: 'author', $options: 'i' },
      });
      expect(result).toEqual([mockBook]);
    });
  });

  describe('update', () => {
    it('should update and return a book', async () => {
      const updatedBook = { ...mockBook, title: 'Updated Title' };
      const book = { title: 'Updated Title' };

      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(updatedBook);

      const result = await service.update(mockBook._id, book as any);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(mockBook._id, book, {
        new: true,
        runValidators: true,
      });

      expect(result.title).toEqual(book.title);
    });
  });

  describe('remove', () => {
    it('should delete a book', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(null);

      const result = await service.remove(mockBook._id);

      expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockBook._id);

      expect(result).toEqual(undefined);
    });
  });
});
