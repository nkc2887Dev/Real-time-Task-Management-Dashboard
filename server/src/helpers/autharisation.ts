import { ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { User } from "src/modules/user/user.schema";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class AuthGuard {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean | User> {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      const authHeader = request.headers["authorization"];
      if (!authHeader) {
        this.logger.warn("Authorization header missing");
        throw new UnauthorizedException("Authorization header missing");
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        this.logger.warn("Token missing in Authorization header");
        throw new UnauthorizedException("Token missing");
      }

      const secret = this.configService.get<string>("SECRET");
      const decoded = await this.jwtService.verifyAsync(token, { secret });

      if (!decoded) {
        this.logger.warn("Invalid token");
        throw new UnauthorizedException("Invalid token");
      }
      const user = await this.userService.getUser(decoded.id);
      request["user"] = user;
      return user;
    } catch (error) {
      this.logger.error("Error in canActivate:", error);
      throw new UnauthorizedException();
    }
  }
}
