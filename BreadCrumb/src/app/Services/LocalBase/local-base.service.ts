import { Injectable } from '@angular/core';

//@ts-ignore
import Localbase from 'localbase';
import { Observable } from 'rxjs';
import { GoogleAppScriptsService } from '../GoogleAppScripts/google-app-scripts.service';

@Injectable({
  providedIn: 'root'
})

export class LocalBaseService {
  db:any;
  constructor(public GoogleAppScripts: GoogleAppScriptsService) {
    this.db = new Localbase('BreadCrumbDB');
  }

  // -----------------------FOLDERS AND FILE-----------------------------------------------------
  GetFilesLinkByFileID(FileId:any, ServerID:string){
    let finalData = new Observable((observer:any) => {
      this.db.collection('FoldersAndFiles').get().then((resultGET:any) => {
        let currentServer = resultGET[0].datas.find((x:any) => x.ServerID == ServerID);
        let currentFileLinks = currentServer.Data.File_Links;
        let fileLinksList = currentFileLinks.filter((x:any) => x.File_Id == FileId);
        observer.next(fileLinksList);
        observer.complete();
      });
    });
    return finalData;
  }

  GetFoldersFilesByUpperFolderID(UpperFolderID:any, ServerID:string){
    let finalData = new Observable((observer:any) => {
      this.db.collection('FoldersAndFiles').get().then((resultGET:any) => {
        let currentServer = resultGET[0].datas.find((x:any) => x.ServerID == ServerID);
        let currentFolder = currentServer.Data.Folders;
        let currentFiles = currentServer.Data.Files;
        let FoldersList = currentFolder.filter((x:any) => x.Folder_UpperFolderId == UpperFolderID);
        let FilesList = currentFiles.filter((x:any) => x.Files_UpperFolderId == UpperFolderID);

        let toReturnData = {
          Folders: FoldersList,
          Files: FilesList,
          ServerId: ServerID
        }

        observer.next(toReturnData);
        observer.complete();
      });
    })
    return finalData;
  }

  GetFoldersFilesServersList(){
    let finalData = new Observable((observer:any) => {
      this.db.collection('FoldersAndFiles').get().then((resultGET:any) => {
        let listServers:any = [];
        try{
          resultGET[0].datas.forEach((element:any) => {
            listServers.push(element.ServerID);
          });
        }
        catch(ex){};
        observer.next(listServers);
        observer.complete();
      })
    })
    return finalData;
  }

  SaveFoldersFilesFromSheetAndSavetoLocalBase(){
    let finalData = new Observable((observer:any) => {
      this.GoogleAppScripts.GetFoldersAndFiles().subscribe((response:any) => {
        if(response.status == "200"){
          let dataToAdd = {datas:response.data};
          this.db.collection('FoldersAndFiles').delete().then((resultLBDEL:any) => {
            this.db.collection('FoldersAndFiles').add(dataToAdd).then((resultLBADD:any) => {
              observer.next(true);
              observer.complete();
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
  // --------------------------------------------------------------------------------------------

  // -------------------------------MOVIES-------------------------------------------------------
  GetMovieLinksByMovieId(MovieId:any, ServerId:string){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Movies').get().then((resultGET:any) => {
        let currentServer = resultGET[0].datas.find((x:any) => x.ServerID == ServerId);
        let AllLinks = currentServer.Data.Links;
        let currentLinks = AllLinks.filter((x:any) => x.Movies_Id == MovieId);
        observer.next(currentLinks);
        observer.complete();
      });
    });
    return finalData;
  }

  GetMovieById(MovieId:any, ServerId:string){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Movies').get().then((resultGET:any) => {
        let currentServer = resultGET[0].datas.find((x:any) => x.ServerID == ServerId);
        let currentTitles = currentServer.Data.Titles;
        let currentTitle = currentTitles.find((x:any) => x.Movies_Id == MovieId);
        observer.next(currentTitle);
        observer.complete();
      });
    });
    return finalData;
  }

  GetAllMovies(){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Movies').get().then((resultGET:any) => {
        let Movies:any = [];
        resultGET[0].datas.forEach((element:any) => {
          let Titles = element.Data.Titles;
          Titles.map((x:any) => x.ServerId = element.ServerID);
          Movies = Movies.concat(Titles);
        });

        observer.next(Movies);
        observer.complete();
      })
    });
    return finalData;
  }

  SaveMoviesFromSheetAndSavetoLocalBase(){
    let finalData = new Observable((observer:any) => {
      this.GoogleAppScripts.GetMovies().subscribe((response:any) => {
        if(response.status == "200"){
          let dataToAdd = {datas:response.data};
          this.db.collection('Movies').delete().then((resultLBDEL:any) => {
            this.db.collection('Movies').add(dataToAdd).then((resultLBADD:any) => {
              observer.next(true);
              observer.complete();
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
  // --------------------------------------------------------------------------------------------
}
