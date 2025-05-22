import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello() {
    return {
      message: "Thynkray server is running",
      data: null,
    };
  }
}
