import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionManagementService } from '../SessionManagementService/session-management.service';

@Injectable({
  providedIn: 'root'
})
export class FoldersFilesService {
  ApiLink:any = "https://script.google.com/macros/s/AKfycbw4j92xCCf5bYGG-ccnh8fmWF1MviiG6Rd05n3q29L1t_bV_Nxj8AzcZ05yPsSahJiD/exec";

  constructor(private http: HttpClient, public SessionManagement: SessionManagementService) { }

  getOptions(){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return options;
  }

  getAllData(body:any){
    return this.http.post(this.ApiLink, body, this.getOptions());
  }
}
