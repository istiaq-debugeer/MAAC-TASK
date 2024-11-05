import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../User/user-module';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SecretKey', 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy], 
  controllers: [AuthController],
  exports: [AuthService, PassportModule, JwtModule], 
})
export class AuthModule {}
