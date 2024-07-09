import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WebsocketGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('offer')
  handleOffer(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
    console.log('offer by: ', client.id);
    this.server.emit('offer', data);
  }

  @SubscribeMessage('answer')
  handleAnswer(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
    console.log('answer by: ', client.id);
    this.server.emit('answer', data);
  }

  @SubscribeMessage('ice-candidate')
  handleIceCandidate(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
    console.log('ice-candidate by: ', client.id);
    this.server.emit('ice-candidate', data);
  }
}