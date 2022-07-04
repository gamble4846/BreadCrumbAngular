import { Injectable } from '@angular/core';

//@ts-ignore
import Localbase from 'localbase';
import { Observable } from 'rxjs';
import { GoogleAppScriptsService } from '../GoogleAppScripts/google-app-scripts.service';
import { ZorroNotificationService } from '../ZorroNotification/zorro-notification.service';

@Injectable({
  providedIn: 'root'
})

export class LocalBaseService {
  db:any;
  constructor(public GoogleAppScripts: GoogleAppScriptsService, public ZorroNotification: ZorroNotificationService) {
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

  GetAllFodlersByServerID(ServerID:string){
    let finalData = new Observable((observer:any) => {
      this.db.collection('FoldersAndFiles').get().then((resultGET:any) => {
        let currentServer = resultGET[0].datas.find((x:any) => x.ServerID == ServerID);
        let currentFolders = currentServer.Data.Folders;
        observer.next(currentFolders);
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
    this.ZorroNotification.log('info', "Folders And Files", "Getting Data From App Scripts", true, null);
    let finalData = new Observable((observer:any) => {
      this.GoogleAppScripts.GetFoldersAndFiles().subscribe((response:any) => {
        this.ZorroNotification.log('info', "Folders And Files", "Data Recieved From App Scripts", true, null);
        if(response.status == "200"){
          this.ZorroNotification.log('success', "Folders And Files", "Data Valid", true, null);
          let dataToAdd = {datas:response.data};
          this.ZorroNotification.log('info', "Folders And Files", "Deleting Data From Local Database", false, null);
          this.db.collection('FoldersAndFiles').delete().then((resultLBDEL:any) => {
            this.ZorroNotification.log('success', "Folders And Files", "Data Deleted From Local Database", false, null);
            this.ZorroNotification.log('info', "Folders And Files", "Adding New Data To Local Database", false, null);
            this.db.collection('FoldersAndFiles').add(dataToAdd).then((resultLBADD:any) => {
              this.ZorroNotification.log('success', "Folders And Files", "New Data Added To Local Database", false, null);
              observer.next(true);
              observer.complete();
            });
          });
        }
        else{
          this.ZorroNotification.log('error', "Folders And Files", "Data Invalid", false, null);
          observer.next(false);
          observer.complete();
        }
      },
      (error) => {
        this.ZorroNotification.log('error', "Folders And Files", "Data Not Recieved From App Scripts", false, error);
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
    this.ZorroNotification.log('info', "Movies", "Getting Data From App Scripts", true, null);
    let finalData = new Observable((observer:any) => {
      this.GoogleAppScripts.GetMovies().subscribe((response:any) => {
        this.ZorroNotification.log('info', "Movies", "Data Recieved From App Scripts", true, null);
        if(response.status == "200"){
          this.ZorroNotification.log('success', "Movies", "Data Valid", true, null);
          let dataToAdd = {datas:response.data};
          this.ZorroNotification.log('info', "Movies", "Deleting Data From Local Database", false, null);
          this.db.collection('Movies').delete().then((resultLBDEL:any) => {
            this.ZorroNotification.log('success', "Movies", "Data Deleted From Local Database", false, null);
            this.ZorroNotification.log('info', "Movies", "Adding New Data To Local Database", false, null);
            this.db.collection('Movies').add(dataToAdd).then((resultLBADD:any) => {
              this.ZorroNotification.log('success', "Movies", "New Data Added To Local Database", false, null);
              observer.next(true);
              observer.complete();
            });
          });
        }
        else{
          this.ZorroNotification.log('error', "Movies", "Data Invalid", false, null);
          observer.next(false);
          observer.complete();
        }
      },
      (error) => {
        this.ZorroNotification.log('error', "Movies", "Data Not Recieved From App Scripts", false, error);
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
    this.ZorroNotification.log('info', "Books", "Getting Data From App Scripts", true, null);
    let finalData = new Observable((observer:any) => {
      this.GoogleAppScripts.GetBooks().subscribe((response:any) => {
        this.ZorroNotification.log('info', "Books", "Data Recieved From App Scripts", true, null);
        if(response.status == "200"){
          this.ZorroNotification.log('success', "Books", "Data Valid", true, null);
          let dataToAdd = {datas:response.data};
          this.ZorroNotification.log('info', "Books", "Deleting Data From Local Database", false, null);
          this.db.collection('Books').delete().then((resultLBDEL:any) => {
            this.ZorroNotification.log('success', "Books", "Data Deleted From Local Database", false, null);
            this.ZorroNotification.log('info', "Books", "Adding New Data To Local Database", false, null);
            this.db.collection('Books').add(dataToAdd).then((resultLBADD:any) => {
              this.ZorroNotification.log('success', "Books", "New Data Added To Local Database", false, null);
              observer.next(true);
              observer.complete();
            });
          });
        }
        else{
          this.ZorroNotification.log('error', "Books", "Data Invalid", false, null);
          observer.next(false);
          observer.complete();
        }
      },
      (error) => {
        this.ZorroNotification.log('error', "Books", "Data Not Recieved From App Scripts", false, error);
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
    this.ZorroNotification.log('info', "Games", "Getting Data From App Scripts", true, null);
    let finalData = new Observable((observer:any) => {
      this.GoogleAppScripts.GetGames().subscribe((response:any) => {
        this.ZorroNotification.log('info', "Games", "Data Recieved From App Scripts", true, null);
        if(response.status == "200"){
          this.ZorroNotification.log('success', "Games", "Data Valid", true, null);
          let dataToAdd = {datas:response.data};
          this.ZorroNotification.log('info', "Games", "Deleting Data From Local Database", false, null);
          this.db.collection('Games').delete().then((resultLBDEL:any) => {
            this.ZorroNotification.log('success', "Games", "Data Deleted From Local Database", false, null);
            this.ZorroNotification.log('info', "Games", "Adding New Data To Local Database", false, null);
            this.db.collection('Games').add(dataToAdd).then((resultLBADD:any) => {
              this.ZorroNotification.log('success', "Games", "New Data Added To Local Database", false, null);
              observer.next(true);
              observer.complete();
            });
          });
        }
        else{
          this.ZorroNotification.log('error', "Games", "Data Invalid", false, null);
          observer.next(false);
          observer.complete();
        }
      },
      (error) => {
        this.ZorroNotification.log('error', "Games", "Data Not Recieved From App Scripts", false, error);
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
    this.ZorroNotification.log('info', "TvShows", "Getting Data From App Scripts", true, null);
    let finalData = new Observable((observer:any) => {
      this.GoogleAppScripts.GetTvShows().subscribe((response:any) => {
        this.ZorroNotification.log('info', "TvShows", "Data Recieved From App Scripts", true, null);
        if(response.status == "200"){
          this.ZorroNotification.log('success', "TvShows", "Data Valid", true, null);
          let dataToAdd = {datas:response.data};
          this.ZorroNotification.log('info', "TvShows", "Deleting Data From Local Database", false, null);
          this.db.collection('TvShows').delete().then((resultLBDEL:any) => {
            this.ZorroNotification.log('success', "TvShows", "Data Deleted From Local Database", false, null);
            this.ZorroNotification.log('info', "TvShows", "Adding New Data To Local Database", false, null);
            this.db.collection('TvShows').add(dataToAdd).then((resultLBADD:any) => {
              this.ZorroNotification.log('success', "TvShows", "New Data Added To Local Database", false, null);
              observer.next(true);
              observer.complete();
            });
          });
        }
        else{
          this.ZorroNotification.log('error', "TvShows", "Data Invalid", false, null);
          observer.next(false);
          observer.complete();
        }
      },
      (error) => {
        this.ZorroNotification.log('error', "TvShows", "Data Not Recieved From App Scripts", false, error);
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
    this.ZorroNotification.log('info', "Comics", "Getting Data From App Scripts", true, null);
    let finalData = new Observable((observer:any) => {
      this.GoogleAppScripts.GetComics().subscribe((response:any) => {
        this.ZorroNotification.log('info', "Comics", "Data Recieved From App Scripts", true, null);
        if(response.status == "200"){
          this.ZorroNotification.log('success', "Comics", "Data Valid", true, null);
          let dataToAdd = {datas:response.data};
          this.ZorroNotification.log('info', "Comics", "Deleting Data From Local Database", false, null);
          this.db.collection('Comics').delete().then((resultLBDEL:any) => {
            this.ZorroNotification.log('success', "Comics", "Data Deleted From Local Database", false, null);
            this.ZorroNotification.log('info', "Comics", "Adding New Data To Local Database", false, null);
            this.db.collection('Comics').add(dataToAdd).then((resultLBADD:any) => {
              this.ZorroNotification.log('success', "Comics", "New Data Added To Local Database", false, null);
              observer.next(true);
              observer.complete();
            });
          });
        }
        else{
          this.ZorroNotification.log('error', "Comics", "Data Invalid", false, null);
          observer.next(false);
          observer.complete();
        }
      },
      (error) => {
        this.ZorroNotification.log('error', "Comics", "Data Not Recieved From App Scripts", false, error);
        observer.next(false);
        observer.complete();
      });
    });
    return finalData;
  }
  // --------------------------------------------------------------------------------------------

  // -----------------------------------MANGA----------------------------------------------------
  GetChaptersLinksByChapterId(ChapterID:any, ServerId:string){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Manga').get().then((resultGET:any) => {
        let currentServer = resultGET[0].datas.find((x:any) => x.ServerID == ServerId);
        let allLinks = currentServer.Data.Links;
        let currentLinks = allLinks.filter((x:any) => x.Chapter_ID == ChapterID);
        observer.next(currentLinks);
        observer.complete();
      });
    });
    return finalData;
  }

  GetChaptersByVolumeId(VolumeID:any, ServerId:string){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Manga').get().then((resultGET:any) => {
        let currentServer = resultGET[0].datas.find((x:any) => x.ServerID == ServerId);
        let allChapters = currentServer.Data.Chapters;
        let currentChapters = allChapters.filter((x:any) => x.Volume_ID == VolumeID);
        observer.next(currentChapters);
        observer.complete();
      });
    });
    return finalData;
  }

  GetVolumesByMangaId(MangaID:any, ServerId:string){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Manga').get().then((resultGET:any) => {
        let currentServer = resultGET[0].datas.find((x:any) => x.ServerID == ServerId);
        let allVolumes = currentServer.Data.Volumes;
        let currentVolumes = allVolumes.filter((x:any) => x.Manga_ID == MangaID);
        observer.next(currentVolumes);
        observer.complete();
      });
    });
    return finalData;
  }

  GetMangaById(MangaID:any, ServerId:string){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Manga').get().then((resultGET:any) => {
        let currentServer = resultGET[0].datas.find((x:any) => x.ServerID == ServerId);
        let currentTitles = currentServer.Data.Titles;
        let currentTitle = currentTitles.find((x:any) => x.Manga_ID == MangaID);
        observer.next(currentTitle);
        observer.complete();
      });
    });
    return finalData;
  }

  GetAllManga(){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Manga').get().then((resultGET:any) => {
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

  SaveMangaFromSheetAndSavetoLocalBase(){
    this.ZorroNotification.log('info', "Manga", "Getting Data From App Scripts", true, null);
    let finalData = new Observable((observer:any) => {
      this.GoogleAppScripts.GetManga().subscribe((response:any) => {
        this.ZorroNotification.log('info', "Manga", "Data Recieved From App Scripts", true, null);
        if(response.status == "200"){
          this.ZorroNotification.log('success', "Manga", "Data Valid", true, null);
          let dataToAdd = {datas:response.data};
          this.ZorroNotification.log('info', "Manga", "Deleting Data From Local Database", false, null);
          this.db.collection('Manga').delete().then((resultLBDEL:any) => {
            this.ZorroNotification.log('success', "Manga", "Data Deleted From Local Database", false, null);
            this.ZorroNotification.log('info', "Manga", "Adding New Data To Local Database", false, null);
            this.db.collection('Manga').add(dataToAdd).then((resultLBADD:any) => {
              this.ZorroNotification.log('success', "Manga", "New Data Added To Local Database", false, null);
              observer.next(true);
              observer.complete();
            });
          });
        }
        else{
          this.ZorroNotification.log('error', "Manga", "Data Invalid", false, null);
          observer.next(false);
          observer.complete();
        }
      },
      (error) => {
        this.ZorroNotification.log('error', "Manga", "Data Not Recieved From App Scripts", false, error);
        observer.next(false);
        observer.complete();
      });
    });
    return finalData;
  }
  // --------------------------------------------------------------------------------------------
}
