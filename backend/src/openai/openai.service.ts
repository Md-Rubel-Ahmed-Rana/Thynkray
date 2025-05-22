import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isObjectIdOrHexString, Model, Types } from "mongoose";
import OpenAI from "openai";
import { Chat } from "./schemas/chat.schema";
import { Message } from "./schemas/message.schema";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    private readonly configService: ConfigService
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>("OPENROUTER_API_KEY"),
      baseURL: this.configService.get<string>("OPENROUTER_API_URL"),
    });
  }

  async streamQuestion(question: string): Promise<ReadableStream<Uint8Array>> {
    const response = await this.openai.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [{ role: "user", content: question }],
      stream: true,
      max_completion_tokens: 1000,
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const content = chunk.choices?.[0]?.delta?.content;
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
        controller.close();
      },
    });

    return stream;
  }

  async createNewChat(
    userId: string,
    question: string,
    answer: string
  ): Promise<string> {
    const userMsg = await this.messageModel.create({
      chatId: null,
      role: "user",
      content: question,
      timestamp: new Date(),
    });

    const assistantMsg = await this.messageModel.create({
      chatId: null,
      role: "assistant",
      content: answer,
      timestamp: new Date(),
    });

    const chat = await this.chatModel.create({
      user: userId,
      title: question.slice(0, 30),
      messages: [userMsg._id, assistantMsg._id],
    });

    await this.messageModel.updateMany(
      { _id: { $in: [userMsg._id, assistantMsg._id] } },
      { chatId: chat._id }
    );
    return chat._id as string;
  }

  async addToChat(chatId: string, question: string, answer: string) {
    const [userMsg, assistantMsg] = await this.messageModel.insertMany([
      {
        chatId,
        role: "user",
        content: question,
      },
      {
        chatId,
        role: "assistant",
        content: answer,
      },
    ]);

    const updatedChat = await this.chatModel.findByIdAndUpdate(
      chatId,
      {
        $push: {
          messages: {
            $each: [userMsg._id, assistantMsg._id],
          },
        },
      },
      { new: true }
    );

    if (!updatedChat) {
      throw new Error(`Chat with ID ${chatId} not found or update failed.`);
    }
    return;
  }

  async getUserChats(userId: string) {
    const chats = await this.chatModel
      .find({ user: userId })
      .select("title createdAt");
    return {
      statusCode: HttpStatus.OK,
      message: "Chats retrieved successfully",
      success: true,
      data: chats,
    };
  }

  async getChatMessages(chatId: Types.ObjectId) {
    const objectId = new Types.ObjectId(chatId);
    const messages = await this.messageModel
      .find({
        chatId: objectId,
      })
      .sort({ createdAt: 1 });
    return {
      statusCode: HttpStatus.OK,
      message: "Messages retrieved successfully",
      success: true,
      data: messages,
    };
  }
}
