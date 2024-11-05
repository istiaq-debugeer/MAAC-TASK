import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/User/user-module'; 
import { jwtConstants } from './constants';
@Module({
    imports: [
        UserModule, 
      
        JwtModule.register({
            global: true,
            secret: 'secret',
            signOptions: { expiresIn: '300s' },
          }),
        
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [JwtModule],
})
export class AuthModule {}
