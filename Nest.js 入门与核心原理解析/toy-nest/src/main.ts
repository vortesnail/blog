import { ToyNestFactory } from './core';
import { Injectable, Controller, Module, Get } from './common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Controller('/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

async function bootstrap() {
  const app = await ToyNestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
