import { Module } from "@nestjs/common";
import { OpenaiService } from "./openai.service";
import { OpenaiController } from "./openai.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Chat, ChatSchema } from "./schemas/chat.schema";
import { Message, MessageSchema } from "./schemas/message.schema";
import { PinoLogger } from "src/common/logger/pino-logger.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  controllers: [OpenaiController],
  providers: [OpenaiService, PinoLogger],
  exports: [PinoLogger],
})
export class OpenaiModule {}
