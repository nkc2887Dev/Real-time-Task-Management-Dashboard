import { Injectable } from "@nestjs/common";

@Injectable()
export class ResponseBuilder {
  responseMessage(success: boolean, message: string, httpStatus: number, detail: any = null, response) {
    if (response) {
      response
        .status(httpStatus)
        .json({
          success: success,
          message: message,
          data: success ? detail : null,
          error: success ? null : detail,
          timestamp: Date.now(),
        })
        .send();
    } else {
      return {
        success: success,
        message: message,
      };
    }
  }

  errorDetail(code: string, errMessage: string, errDetail: any) {
    return {
      code: code,
      message: errMessage,
      detail: errDetail,
    };
  }
}
