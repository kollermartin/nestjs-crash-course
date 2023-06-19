import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, request, Request, Response } from "express";

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("exampleMiddleware");
    console.log(req.headers.authorization);

    const { authorization } = req.headers;

    console.log(authorization);

    if (!authorization) throw new HttpException("No Token", HttpStatus.FORBIDDEN);

    if (authorization === "kojot") {

      next();
    } else {
      throw new HttpException("Invalid token", HttpStatus.FORBIDDEN);
    }

  }
}
