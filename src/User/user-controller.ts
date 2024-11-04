import { Controller,Post,Get,Body,Param } from "@nestjs/common";
import { UserService } from "./user-service";
import { User, User as userModel } from "./user-model";




@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {
     console.log('UserService initialized:', this.userService)
  }

  @Post()
  async create(@Body() userData: Partial<userModel>): Promise<userModel> {
    return this.userService.createUser(userData);
  }

  @Get(':id') 
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.getsingleUser(id);
  }
}