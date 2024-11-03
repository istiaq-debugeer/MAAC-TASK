import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user-model";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}



    async createuser(userData:Partial<User>):Promise<User>{
        return this.userModel.create(userData);
    }
   




}