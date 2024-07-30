import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit{

  @WebSocketServer()
  public server:Server;

  constructor(private readonly chatService: ChatService) {}
  
  
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('New client connected');
    }); 
}

@SubscribeMessage('send-message')
handleMessage( 
  @MessageBody() message: string,
  @ConnectedSocket() client: Socket
) {
  
  if ( !message ) return;

  this.server.emit(
    'on-message', 
    { userId: client.id, message: message }
  )

}


}
