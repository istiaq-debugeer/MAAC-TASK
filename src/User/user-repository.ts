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

    async findById(id: string): Promise<User> {
        return this.userModel.findByPk(id);
    }

    
}