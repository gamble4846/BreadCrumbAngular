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

  // -------------------------------------BOOKS--------------------------------------------------
  GetBookLinksByMovieId(BookId:any, ServerId:string){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Books').get().then((resultGET:any) => {
        let currentServer = resultGET[0].datas.find((x:any) => x.ServerID == ServerId);
        let AllLinks = currentServer.Data.Links;
        let currentLinks = AllLinks.filter((x:any) => x.Book_Id == BookId);
        observer.next(currentLinks);
        observer.complete();
      });
    });
    return finalData;
  }

  GetBookById(BookId:any, ServerId:string){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Books').get().then((resultGET:any) => {
        let currentServer = resultGET[0].datas.find((x:any) => x.ServerID == ServerId);
        let currentTitles = currentServer.Data.Titles;
        let currentTitle = currentTitles.find((x:any) => x.Book_Id == BookId);
        observer.next(currentTitle);
        observer.complete();
      });
    });
    return finalData;
  }

  GetAllBooks(){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Books').get().then((resultGET:any) => {
        let Books:any = [];
        resultGET[0].datas.forEach((element:any) => {
          let Titles = element.Data.Titles;
          Titles.map((x:any) => x.ServerId = element.ServerID);
          Books = Books.concat(Titles);
        });

        observer.next(Books);
        observer.complete();
      })
    });
    return finalData;
  }

  SaveBooksFromSheetAndSavetoLocalBase(){
    let finalData = new Observable((observer:any) => {
      this.GoogleAppScripts.GetBooks().subscribe((response:any) => {
        if(response.status == "200"){
          let dataToAdd = {datas:response.data};
          this.db.collection('Books').delete().then((resultLBDEL:any) => {
            this.db.collection('Books').add(dataToAdd).then((resultLBADD:any) => {
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

  // --------------------------------------GAMES-------------------------------------------------
  GetGameLinksByGameId(GameId:any, ServerId:string){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Games').get().then((resultGET:any) => {
        let currentServer = resultGET[0].datas.find((x:any) => x.ServerID == ServerId);
        let AllLinks = currentServer.Data.Links;
        let currentLinks = AllLinks.filter((x:any) => x.Game_Id == GameId);
        observer.next(currentLinks);
        observer.complete();
      });
    });
    return finalData;
  }

  GetGameById(GameId:any, ServerId:string){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Games').get().then((resultGET:any) => {
        let currentServer = resultGET[0].datas.find((x:any) => x.ServerID == ServerId);
        let currentTitles = currentServer.Data.Titles;
        let currentTitle = currentTitles.find((x:any) => x.Game_Id == GameId);
        observer.next(currentTitle);
        observer.complete();
      });
    });
    return finalData;
  }

  GetAllGames(){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Games').get().then((resultGET:any) => {
        let Games:any = [];
        resultGET[0].datas.forEach((element:any) => {
          let Titles = element.Data.Titles;
          Titles.map((x:any) => x.ServerId = element.ServerID);
          Games = Games.concat(Titles);
        });

        observer.next(Games);
        observer.complete();
      })
    });
    return finalData;
  }

  SaveGamesFromSheetAndSavetoLocalBase(){
    let finalData = new Observable((observer:any) => {
      this.GoogleAppScripts.GetGames().subscribe((response:any) => {
        if(response.status == "200"){
          let dataToAdd = {datas:response.data};
          this.db.collection('Games').delete().then((resultLBDEL:any) => {
            this.db.collection('Games').add(dataToAdd).then((resultLBADD:any) => {
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

  // --------------------------------TVSHOWS-----------------------------------------------------
  GetEpisodeLinksByEpisodeId(EpisodeId:any, ServerId:string){
    let finalData = new Observable((observer:any) => {
      this.db.collection('TvShows').get().then((resultGET:any) => {
        let currentServer = resultGET[0].datas.find((x:any) => x.ServerID == ServerId);
        let allLinks = currentServer.Data.Links;
        let currentLinks = allLinks.filter((x:any) => x.Episode_Id == EpisodeId);
        observer.next(currentLinks);
        observer.complete();
      });
    });
    return finalData;
  }

  GetEpisodesBySeasonId(SeasonId:any, ServerId:string){
    let finalData = new Observable((observer:any) => {
      this.db.collection('TvShows').get().then((resultGET:any) => {
        let currentServer = resultGET[0].datas.find((x:any) => x.ServerID == ServerId);
        let allEpisodes = currentServer.Data.Episodes;
        let currentEpisodes = allEpisodes.filter((x:any) => x.Season_Id == SeasonId);
        observer.next(currentEpisodes);
        observer.complete();
      });
    });
    return finalData;
  }

  GetSeasonsByTvShowId(TvShowId:any, ServerId:string){
    let finalData = new Observable((observer:any) => {
      this.db.collection('TvShows').get().then((resultGET:any) => {
        let currentServer = resultGET[0].datas.find((x:any) => x.ServerID == ServerId);
        let allSeasons = currentServer.Data.Seasons;
        let currentSeasons = allSeasons.filter((x:any) => x.Series_Id == TvShowId);
        observer.next(currentSeasons);
        observer.complete();
      });
    });
    return finalData;
  }

  GetTvShowById(TvShowId:any, ServerId:string){
    let finalData = new Observable((observer:any) => {
      this.db.collection('TvShows').get().then((resultGET:any) => {
        let currentServer = resultGET[0].datas.find((x:any) => x.ServerID == ServerId);
        let currentTitles = currentServer.Data.Titles;
        let currentTitle = currentTitles.find((x:any) => x.Series_Id == TvShowId);
        observer.next(currentTitle);
        observer.complete();
      });
    });
    return finalData;
  }

  GetAllTvShows(){
    let finalData = new Observable((observer:any) => {
      this.db.collection('TvShows').get().then((resultGET:any) => {
        let TvShows:any = [];
        resultGET[0].datas.forEach((element:any) => {
          let Titles = element.Data.Titles;
          Titles.map((x:any) => x.ServerId = element.ServerID);
          TvShows = TvShows.concat(Titles);
        });

        observer.next(TvShows);
        observer.complete();
      })
    });
    return finalData;
  }

  SaveTvShowsFromSheetAndSavetoLocalBase(){
    let finalData = new Observable((observer:any) => {
      this.GoogleAppScripts.GetTvShows().subscribe((response:any) => {
        if(response.status == "200"){
          let dataToAdd = {datas:response.data};
          this.db.collection('TvShows').delete().then((resultLBDEL:any) => {
            this.db.collection('TvShows').add(dataToAdd).then((resultLBADD:any) => {
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

  // ------------------------------------COMICS--------------------------------------------------
  GetIssuesLinksByIssueId(IssueId:any, ServerId:string){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Comics').get().then((resultGET:any) => {
        let currentServer = resultGET[0].datas.find((x:any) => x.ServerID == ServerId);
        let AllLinks = currentServer.Data.Links;
        let currentLinks = AllLinks.filter((x:any) => x.Issue_ID == IssueId);
        observer.next(currentLinks);
        observer.complete();
      });
    });
    return finalData;
  }

  GetIssuesByComicId(ComicId:any, ServerId:string){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Comics').get().then((resultGET:any) => {
        let currentServer = resultGET[0].datas.find((x:any) => x.ServerID == ServerId);
        let AllIssues = currentServer.Data.Issues;
        let currentIssues = AllIssues.filter((x:any) => x.Comic_ID == ComicId);
        observer.next(currentIssues);
        observer.complete();
      });
    });
    return finalData;
  }

  GetComicsById(ComicId:any, ServerId:string){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Comics').get().then((resultGET:any) => {
        let currentServer = resultGET[0].datas.find((x:any) => x.ServerID == ServerId);
        let currentTitles = currentServer.Data.Titles;
        let currentTitle = currentTitles.find((x:any) => x.Comic_ID == ComicId);
        observer.next(currentTitle);
        observer.complete();
      });
    });
    return finalData;
  }

  GetAllComics(){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Comics').get().then((resultGET:any) => {
        let Comics:any = [];
        resultGET[0].datas.forEach((element:any) => {
          let Titles = element.Data.Titles;
          Titles.map((x:any) => x.ServerId = element.ServerID);
          Comics = Comics.concat(Titles);
        });

        observer.next(Comics);
        observer.complete();
      })
    });
    return finalData;
  }

  SaveComicsFromSheetAndSavetoLocalBase(){
    let finalData = new Observable((observer:any) => {
      this.GoogleAppScripts.GetComics().subscribe((response:any) => {
        if(response.status == "200"){
          let dataToAdd = {datas:response.data};
          this.db.collection('Comics').delete().then((resultLBDEL:any) => {
            this.db.collection('Comics').add(dataToAdd).then((resultLBADD:any) => {
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
