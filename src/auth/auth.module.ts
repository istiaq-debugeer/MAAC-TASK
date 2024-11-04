import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/User/user-module'; 

@Module({
    imports: [
        UserModule, 
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'yourSecretKey',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [JwtModule],
})
export class AuthModule {}
