import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  data = new BehaviorSubject<string>('');

  socket : any;

  constructor() { }

  setupSocketConnection(){
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on('broadcast', (data: string) => {
      this.data.next(data)
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  sendData(msg : string) : any {
    if(this.socket){
      this.socket.emit('message', msg);
    }
  }
}
