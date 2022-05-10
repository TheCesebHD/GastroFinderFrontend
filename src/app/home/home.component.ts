import { Component, OnInit } from '@angular/core';
import { UserstoreService } from '../stores/userstore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(readonly store: UserstoreService) { }

  ngOnInit(): void {
    
  }

}
