import { Injectable } from '@angular/core';
import { Observable, first, take } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

   socket:any

  constructor() {
    this.socket = io('http://localhost:3000' , { transports: ['websocket', 'polling', 'flashsocket'] });

   }

   connectSocket(){
    this.socket.connect();
    //console.log("Conectado!")
   }

   disconnectSocket(): void {
    this.socket.disconnect();
    //console.log("Desconnectado!")
  }

  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  onMsg(eventName: string): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
        //observer.closed
        observer.complete()
      });
    })
  }

  on(eventName:string){
    this.socket.on(eventName, () =>{
      console.log("Evento recibido!")
    })
    return true;
  }
}
