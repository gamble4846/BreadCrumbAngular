import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalBaseService } from 'src/app/Services/LocalBase/local-base.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  GameIDURL:any = "";
  ServerIDURL:any = "";
  showAllGames:boolean = true;
  GameTitles:any = [];
  CurrentGameLinks:any = [];
  CurrentGameTitle:any = {};

  constructor(public LocalBase:LocalBaseService, private route: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    this.StartUpFun();
  }

  StartUpFun(){
    this.route.queryParams.subscribe(params => {
      this.ServerIDURL = params['ServerId'];
      this.GameIDURL = params['GameId'];

      if(this.GameIDURL == "" || this.GameIDURL == null || this.GameIDURL == undefined || this.ServerIDURL == "" || this.ServerIDURL == null || this.ServerIDURL == undefined){
        this.getAllGamesTitles();
        this.showAllGames = true;
      }
      else{
        this.getGameById();
        this.showAllGames = false;
      }
    });
  }

  GameTitleClicked(ServerId:any, GameId:any){
    this.router.navigate(
      ['/Games'],
      { queryParams: { ServerId: ServerId, GameId: GameId } }
    );
  }

  getAllGamesTitles(){
    this.LocalBase.GetAllGames().subscribe((response:any) => {
      this.GameTitles = response;
    });
  }

  getGameById(){
    this.LocalBase.GetGameById(this.GameIDURL, this.ServerIDURL).subscribe((response:any) => {
      this.CurrentGameTitle = response;
    });

    this.LocalBase.GetGameLinksByGameId(this.GameIDURL, this.ServerIDURL).subscribe((response:any) => {
      console.log(response);
      this.CurrentGameLinks = response;
    });
  }

  refreshGames(){
    this.LocalBase.SaveGamesFromSheetAndSavetoLocalBase().subscribe((response:any) => {
      if(response == true){
        this.StartUpFun();
      }
    });
  }
}
