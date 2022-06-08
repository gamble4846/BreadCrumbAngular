import { Component, OnInit } from '@angular/core';
import { LocalBaseCustomService } from 'src/app/Services/LocalBaseService/local-base-custom.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public LocalBaseCustom: LocalBaseCustomService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.LocalBaseCustom.getFoldersFilesFromGoogleSheet()
    .subscribe((response:any) => {
      console.log(response);
      this.LocalBaseCustom.getFoldersFilesFromLocalBase()
      .subscribe((response:any) => {
        console.log(response);
      });
    })
  }
}
