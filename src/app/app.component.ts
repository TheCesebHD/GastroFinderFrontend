/**********************************************************************************
 * If you look at the code and dont understand what is going on here, dont worry. *
 * I dont understand what I am doing either                                       * 
 **********************************************************************************/

import { Component } from '@angular/core';
import { webSocket } from "rxjs/webSocket";
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gastroFinder'; 

  constructor(private websocket : WebsocketService) { }

  ngOnInit(){
  }
}