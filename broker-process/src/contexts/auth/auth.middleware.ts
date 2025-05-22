import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly _apiKey = this.configService.get<string>("API_KEY");

  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers["x-api-key"];

    if (
      apiKey !== this._apiKey
    ) {
      throw new UnauthorizedException("Unauthorized");
    }
    next();
  }
}
