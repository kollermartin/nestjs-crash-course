import {
  Body,
  Controller,
  Get,
  Param, ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { Request, Response } from "express";
import { CreateUserDto } from "../../dtos/createUser.dto";

@Controller('users')
export class UsersController {

  @Get()
  getUsers(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean) {
    console.log(sortDesc);
    return {
      username: 'Kojot',
      email: 'kojot@kojot.cz'
    }
  }

  @Get('posts')
  getUsersPosts() {
    return [
      {
        username: 'Kojot',
        email: 'kojot@kojot.cz',
        posts: [
          {
            id: 1,
            title: "Example"
          },
          {
            id: 2,
            title: "Example 2"
          }
        ]
      }
    ];
  }

  // @Post()
  // createUser(@Req() request: Request, @Res() response: Response) {
  //   console.log(request.body);
  //   response.send('Created');
  // }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() userPayload: CreateUserDto) {
    console.log(userPayload);
    return {};
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return { id };
  }
}
