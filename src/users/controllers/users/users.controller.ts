import {
  Body,
  Controller,
  Get, HttpException, HttpStatus,
  Param, ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query, UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { CreateUserDto } from "../../dtos/createUser.dto";
import { UsersService } from "../../services/users/users.service";
import { ValidateCreateUserPipe } from "../../pipes/validate-create-user/validate-create-user.pipe";
import { AuthGuard } from "../../guards/auth/auth.guard";

@Controller("users")
@UseGuards(AuthGuard)
export class UsersController {

  constructor(private userService: UsersService) {
  }

  // @Get()
  // getUsers(@Query("sortDesc", ParseBoolPipe) sortDesc: boolean) {
  //   console.log(sortDesc);
  //   return {
  //     username: "Kojot",
  //     email: "kojot@kojot.cz"
  //   };
  // }

  @Get()
  getUsers() {
    return this.userService.fetchUsers();
  }

  @Get("posts")
  getUsersPosts() {
    return [
      {
        username: "Kojot",
        email: "kojot@kojot.cz",
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

  @Post("create")
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userPayload: CreateUserDto) {
    console.log(userPayload);
    return this.userService.createUser(userPayload);
  }

  @Get(":id")
  getUserById(@Param("id", ParseIntPipe) id: number) {
    const user =  this.userService.fetchUserById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }

    return user;
  }
}
