import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleAppScriptsService {
  apiLink:string = "https://script.google.com/macros/s/AKfycbwvrO3nUCNhIQbAn6kCLK8vvoA6O0eTpYeDWNaspK5jMacpnDYLvBV3TNq4y5qZSdxf/exec";

  constructor(private http: HttpClient) { }

  getOptions(){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return options;
  }

  GetFoldersAndFiles(){
    var body ={
      "method": "GET",
      "Action": "FOLDERSFILES"
    };
    return this.http.post(this.apiLink, body, this.getOptions());
  }
}
