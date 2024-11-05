import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PostController } from './posts/post-controller';
// import { PostService } from './posts/post-service';
// Import your models
import { Post } from 'src/posts/post-model';
import { PostModule } from './posts/post.module';
import { UserModule } from './User/user-module';
import { User } from './User/user-model';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true, 
  }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT, 
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [Post, User],
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    PostModule,
    UserModule,
    
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
