import { Controller,Post,Get,Put,Delete,Body,Param } from "@nestjs/common";
import { UserService } from "./user-service";
import { User as userModel } from "./user-model";




@Controller('/users')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Post()
  async create(@Body() userData: Partial<userModel>): Promise<userModel> {
    return this.user.createuser(userData);
  }
}