import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user-model";
import { UserRepository } from "./user-repository";

@Injectable()
export class UserService {
  constructor(@InjectModel(User)  private userRepository: UserRepository) {
    console.log('UserRepository Initialized:', userRepository)
  }

    async createUser(userData:Partial<User>):Promise<User>{
        return this.userRepository.create(userData);
    }
    async getsingleUser(id: string): Promise<User> {
      const user = await this.userRepository.findById(id);
      if (!user) {
          throw new NotFoundException('User not found'); // Updated message
      }
      return user;
    }

  }

