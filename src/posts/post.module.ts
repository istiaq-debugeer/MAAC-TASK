import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './post-model'; // Ensure this path is correct
import { PostService } from './post-service'; // Ensure this path is correct
import { PostController } from './post-controller'; // Ensure this path is correct
import { PostRepository } from './post-repository';
import { UserModule } from 'src/User/user-module';

@Module({
  imports: [SequelizeModule.forFeature([Post]),
  UserModule,
],
  providers: [PostService,PostRepository],
  controllers: [PostController],
  exports:[PostService]
})
export class PostModule {}
