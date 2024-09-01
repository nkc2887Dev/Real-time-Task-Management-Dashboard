import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/modules/user/user.schema";

@Injectable()
export class CommonService {
  private readonly logger = new Logger(CommonService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(user: User): Promise<string> {
    try {
      const jwtToken = this.jwtService.sign(
        { id: user._id, email: user.email },
        {
          secret: this.configService.get<string>("SECRET"),
          expiresIn: this.configService.get<string>("EXPIRES_IN"),
        },
      );
      return jwtToken;
    } catch (error) {
      this.logger.error("Error - generateToken:", error);
      throw error;
    }
  }
}
