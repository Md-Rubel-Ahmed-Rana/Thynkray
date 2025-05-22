import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Message } from "./message.schema";

@Schema({ timestamps: true })
export class Chat extends Document {
  @Prop({ required: true })
  user: string;

  @Prop()
  title?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: "Message" }] })
  messages: Message[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
