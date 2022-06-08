import { Component, OnInit } from '@angular/core';
import { FoldersFilesService } from 'src/app/Services/FoldersFilesService/folders-files.service';
import { GoogleScriptService } from 'src/app/Services/GoogleScriptService/google-script.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public FoldersFiles: FoldersFilesService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    let body = {
      'method': 'GET',
      'Action': "FOLDERSFILES",
    }

    this.FoldersFiles.getAllData(body)
    .subscribe((response:any) => {
      console.log(response);
    },
    (error) => {
      console.log(error);
    });
  }
}
