import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user-model';
import { UserService } from './user-service'; 
import { UserController } from './user-controler';
import { UserRepository } from './user-repository';
@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService,UserRepository],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}