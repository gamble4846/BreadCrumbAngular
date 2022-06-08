import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionManagementService } from '../SessionManagementService/session-management.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleScriptService {
  ApiLink:any = "https://script.google.com/macros/s/AKfycbwJwytNRVikZ4wT7sNOvtjlOYffRswz8lS3gUVmer8bMisnqD5tjYjJsbVTUx1425kN/exec";

  constructor(private http: HttpClient, public SessionManagement: SessionManagementService) { }

  getOptions(){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return options;
  }

  getAllData(){
    return this.http.get(this.ApiLink, this.getOptions());
  }
}
