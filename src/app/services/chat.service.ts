import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, first, tap } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket;
  private url = 'http://localhost:3000'; // your server local path
  // private url = 'https://chat-dot-philip-campaign.uc.r.appspot.com'; // your server online path
  private subject = new BehaviorSubject<any[]>([]);
  messages$: Observable<any[]> = this.subject.asObservable();
  constructor() {
    this.socket = io(this.url, {transports: ['websocket']});
  }

  joinRoom(data): void {
    this.socket.emit('join', data);
  }

  sendMessage(data): void {
    this.socket.emit('message', data);
  }

  getMessage(): Observable<any> {
    return new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new message', (data) => {
        console.log(data);

        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }

  getStorage() {
    const storage: string = localStorage.getItem('chats');
    return storage ? JSON.parse(storage) : [];

    // this.crud.getAuthData(`messageByRoomId?roomId=`).pipe(
    //   first(),
    //   tap((e: any) => this.subject.next(e))
    // ).subscribe();
  }

  setStorage(data) {
    localStorage.setItem('chats', JSON.stringify(data));
  }

}
