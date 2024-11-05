import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user-model';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}

    async create(userData: Partial<User>): Promise<User> {
        const newUser = await this.userModel.create(userData);
        return newUser;
    }


    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    // async findById(identifier: string): Promise<User> {
    //     return this.userModel.findByPk(identifier);
    // }
    async findByIdOrUsername(identifier: string): Promise<User> {
        let user = await this.userModel.findByPk(identifier);
            if (!user) {
                
                user = await this.userModel.findOne({ where: { username: identifier } });
            }
            return user; 

    
    }
}