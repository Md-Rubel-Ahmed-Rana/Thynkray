import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import { OpenaiService } from "./openai.service";
import { Response } from "express";
import { PinoLogger } from "src/common/logger/pino-logger.service";
import { AuthGuard } from "src/guards/auth.guard";
import { Types } from "mongoose";

@Controller("openai")
export class OpenaiController {
  constructor(
    private readonly openaiService: OpenaiService,
    private readonly logger: PinoLogger
  ) {}

  @UseGuards(AuthGuard)
  @Get("ask")
  async stream(
    @Query("question") question: string,
    @Query("chatId") chatId: string,
    @Query("userId") userId: string,
    @Res() res: Response
  ) {
    res.setHeader("Content-Type", "text/plain");

    let newChatId = chatId;
    let fullAnswer = "";

    if (!chatId) {
      this.logger.log(`Creating new chat for user: ${userId}`);
      newChatId = await this.openaiService.createNewChat(userId, question, "");

      res.write(`[CHAT_ID]${newChatId}\n`);
    }

    const stream = await this.openaiService.streamQuestion(question);
    const reader = stream.getReader();
    const decoder = new TextDecoder("utf-8");

    const pump = async () => {
      const { done, value } = await reader.read();
      if (done) {
        res.end();
        await this.openaiService.addToChat(newChatId, question, fullAnswer);
        return;
      }

      const chunk = decoder.decode(value);
      fullAnswer += chunk;
      res.write(chunk);
      pump();
    };

    pump();
  }

  @UseGuards(AuthGuard)
  @Get("chats/:userId")
  getUserChats(@Param("userId") userId: string) {
    return this.openaiService.getUserChats(userId);
  }

  @UseGuards(AuthGuard)
  @Get("chats/messages/:id")
  getChatMessages(@Param("id") chatId: Types.ObjectId) {
    return this.openaiService.getChatMessages(chatId);
  }

  @UseGuards(AuthGuard)
  @Patch("chats/:id")
  async updateChatTitle(
    @Param("id") id: string,
    @Body() body: { title: string }
  ) {
    return this.openaiService.updateChatTitle(id, body.title);
  }

  @UseGuards(AuthGuard)
  @Delete("chats/:id")
  async deleteChat(@Param("id") id: string) {
    return this.openaiService.deleteChat(id);
  }
}
