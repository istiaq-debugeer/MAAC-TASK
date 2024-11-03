import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user-model';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}

    async singleUser(id: string): Promise<User> {
        return this.userModel.findOne({where:{id}});
    }
}