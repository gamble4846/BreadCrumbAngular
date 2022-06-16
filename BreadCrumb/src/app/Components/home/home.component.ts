import { Component, OnInit } from '@angular/core';
import { LocalBaseService } from 'src/app/Services/LocalBase/local-base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public LocalBase:LocalBaseService) { }

  ngOnInit(): void {
  }

  getData(){

  }
}
