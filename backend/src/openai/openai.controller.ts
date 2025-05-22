import { Controller, Get, Param, Query, Res, UseGuards } from "@nestjs/common";
import { OpenaiService } from "./openai.service";
import { Response } from "express";
import { PinoLogger } from "src/common/logger/pino-logger.service";
import { AuthGuard } from "src/guards/auth.guard";

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
    const stream = await this.openaiService.streamQuestion(question);
    res.setHeader("Content-Type", "text/plain");

    const reader = stream.getReader();
    const decoder = new TextDecoder("utf-8");
    let fullAnswer = "";
    const pump = async () => {
      const { done, value } = await reader.read();
      if (done) {
        res.end();
        if (chatId) {
          this.logger.log(`Got chat id: ${chatId}`);
          await this.openaiService.addToChat(chatId, question, fullAnswer);
        } else {
          this.logger.log(`Creating new chat for user: ${userId}`);
          await this.openaiService.createNewChat(userId, question, fullAnswer);
        }
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
  getChatMessages(@Param("id") chatId: string) {
    return this.openaiService.getChatMessages(chatId);
  }
}
