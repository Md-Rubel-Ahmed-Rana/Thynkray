import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ required: true })
  role: "user" | "assistant";

  @Prop()
  content: string;

  @Prop({ type: Types.ObjectId, ref: "Chat" })
  chatId: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
