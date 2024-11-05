import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { PassportModule } from '@nestjs/passport';

@Module({

imports: [PassportModule.register({ defaultStrategy: 'jwt' })],

})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
