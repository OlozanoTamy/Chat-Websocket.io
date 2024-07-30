import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';



@Module({
  imports: [    
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
  }),

  ChatModule,]
})
export class AppModule {}
