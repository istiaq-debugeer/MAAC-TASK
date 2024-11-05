import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user-model";
import { UserRepository } from "./user-repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository,
             
  ) {
    console.log('UserRepository Initialized:', userRepository)
  }

    async createUser(userData:Partial<User>):Promise<User>{
        return this.userRepository.create(userData);
    }


    async getAllUser():Promise<User[]>{
      return this.userRepository.findAll();
    }

   

    async getsingleUser(identifier: string): Promise<User> {
      let user = await this.userRepository.findByIdOrUsername(identifier);
      if (!user) {
        user = await this.userRepository.findByIdOrUsername(identifier);
      }
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;

    }
  }

