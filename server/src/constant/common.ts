import { Injectable } from "@nestjs/common";

@Injectable()
export class CommonConstant {
  JWT: {
    EXPIRES_IN: "24h";
    SECRET: "myjwtsecret";
  };
  TASK_STATUS: {
    TODO: "TODO";
    IN_PROGRESS: "IN_PROGRESS";
    COMPLETED: "COMPLETED";
    IN_REVIEW: "IN_REVIEW";
    ACCEPTED: "ACCEPTED";
    REJECTED: "REJECTED";
    ON_HOLD: "ON_HOLD";
    CLOSED: "CLOSED";
  };
}
