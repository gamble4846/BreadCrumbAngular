import { Injectable } from '@angular/core';
import { FoldersFilesService } from '../FoldersFilesService/folders-files.service';
import { Observable, observable } from 'rxjs';

//@ts-ignore
import Localbase from 'localbase';


@Injectable({
  providedIn: 'root'
})
export class LocalBaseCustomService {
  db:any;

  constructor(public FoldersFiles: FoldersFilesService) { 
    this.db = new Localbase('db');
  }

  getFoldersFilesFromGoogleSheet(){
    let finalData = new Observable((observer:any) => {
      let body = {
        'method': 'GET',
        'Action': "FOLDERSFILES",
      }
      
      this.FoldersFiles.getAllData(body)
      .subscribe((response:any) => {
        this.db.collection('FoldersFiles').add(response).then((result:any) => {
          observer.next(true);
          observer.complete();
        });
      },
      (error) => {
        observer.next(false);
        observer.complete();
      });
    });
    return finalData;
  }

  getFoldersFilesFromLocalBase(){
    let finalData = new Observable((observer:any) => {
      this.db.collection('FoldersFiles').get().then((result:any) => {
        observer.next(result);
        observer.complete();
      })
    });
    return finalData;
  }
}
