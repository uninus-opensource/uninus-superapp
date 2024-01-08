import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TJwtPayload } from "@uninus/entities";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("refreshToken"),
      secretOrKey: process.env["REFRESH_SECRET"],
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: TJwtPayload) {
    const refreshToken = req;

    if (!refreshToken) throw new ForbiddenException("Refresh token malformed");

    return { sub: payload.sub, email: payload.email, role: payload.role };
  }
}
