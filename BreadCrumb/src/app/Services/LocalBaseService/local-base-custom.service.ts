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
    this.db = new Localbase('BreadCrumbDB');
  }

  getFoldersFilesFromGoogleSheet(){
    let finalData = new Observable((observer:any) => {
      let body = {
        'method': 'GET',
        'Action': "FOLDERSFILES",
      }
      
      this.FoldersFiles.getAllData(body)
      .subscribe((response:any) => {
        console.log(response);
        if(response.status == "200"){
          let foldersCompleted = 0;
          this.db.collection('Folders').delete().then((result:any) => {
            response.data.forEach((res:any) => {
              this.db.collection('Folders').add({
                data: res.Data.Folders,
                ServerId: res.ServerID
              }).then((result:any) => {
                foldersCompleted++;
                if(foldersCompleted >= response.data.length){
                  let filesCompleted = 0;
                  this.db.collection('Files').delete().then((result:any) => {
                    response.data.forEach((res:any) => {
                      this.db.collection('Files').add({
                        data: res.Data.Files,
                        ServerId: res.ServerID
                      }).then((result:any) => {
                        filesCompleted++;
                        if(filesCompleted >= response.data.length){
                          let fileLinksCompleted = 0;
                          this.db.collection('File_Links').delete().then((result:any) => {
                            response.data.forEach((res:any) => {
                              this.db.collection('File_Links').add({
                                data: res.Data.File_Links,
                                ServerId: res.ServerID
                              }).then((result:any) => {
                                fileLinksCompleted++;
                                if(fileLinksCompleted >= response.data.length){
                                  observer.next(true);
                                  observer.complete();
                                }
                              });
                            });
                          });
                        }
                      });
                    });
                  });
                }
              });
            });
          });
        }
        else{
          observer.next(false);
          observer.complete();
        }
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
      this.db.collection('Folders').get().then((result:any) => {
        observer.next(result);
        observer.complete();
      })
    });
    return finalData;
  }
}
