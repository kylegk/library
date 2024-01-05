import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  isbn: string;

  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  description: string;

  @Prop()
  publisher: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
