import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Recipe {
  /** Set by Mongoose (timestamps) */
  createdAt!: Date;

  @Prop({ type: [String], required: true })
  ingredients!: string[];

  /** Id of the author, a user of the user service: no join, just the id */
  @Prop({ required: true, index: true })
  ownerId!: string;

  @Prop({ type: [String], required: true })
  steps!: string[];

  @Prop({ required: true, trim: true })
  title!: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
