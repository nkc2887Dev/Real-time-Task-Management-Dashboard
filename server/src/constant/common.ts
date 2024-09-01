import { Injectable } from "@nestjs/common";

@Injectable()
export class CommonConstant {
  JWT: {
    EXPIRES_IN: "24h";
    SECRET: "myjwtsecret";
  };
}
