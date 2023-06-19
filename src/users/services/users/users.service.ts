import { Injectable } from "@nestjs/common";
import { CreateUserType } from "../../utils/types";

@Injectable()
export class UsersService {

  private fakeUsers = [{
    username: "Anson",
    email: "kojot@kojot.cz"
  }, {
    username: "Anson",
    email: "kojot@kojot.cz"
  }, {
    username: "Anson",
    email: "kojot@kojot.cz"
  }];


  fetchUsers() {
    return this.fakeUsers;
  }

  createUser(userData: CreateUserType) {
    this.fakeUsers.push(userData);
    return;
  }

  fetchUserById(id: number) {
    return {id: 1, username: 'Anson', email: 'kojot@kojot.cz'}
  }
}
