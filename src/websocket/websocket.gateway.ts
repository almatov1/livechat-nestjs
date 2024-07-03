import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3002)
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  // Обрабатываем подключение клиента
  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  // Обрабатываем отключение клиента
  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  // Обрабатываем сообщение о присоединении к комнате
  @SubscribeMessage('join')
  handleJoin(client: Socket, room: string): void {
    client.join(room); // Подключаем клиента к комнате
    client.to(room).emit('user-connected', client.id); // Уведомляем остальных пользователей в комнате о новом подключении
  }

  // Обрабатываем сообщение с предложением (offer) от одного клиента другому
  @SubscribeMessage('offer')
  handleOffer(client: Socket, payload: { room: string, offer: RTCSessionDescriptionInit }) {
    client.to(payload.room).emit('offer', payload.offer); // Пересылаем предложение всем в комнате
  }

  // Обрабатываем сообщение с ответом (answer) на предложение
  @SubscribeMessage('answer')
  handleAnswer(client: Socket, payload: { room: string, answer: RTCSessionDescriptionInit }) {
    client.to(payload.room).emit('answer', payload.answer); // Пересылаем ответ всем в комнате
  }

  // Обрабатываем сообщение с кандидатом ICE (ICE candidate)
  @SubscribeMessage('candidate')
  handleCandidate(client: Socket, payload: { room: string, candidate: RTCIceCandidateInit }) {
    client.to(payload.room).emit('candidate', payload.candidate); // Пересылаем кандидата всем в комнате
  }
}
