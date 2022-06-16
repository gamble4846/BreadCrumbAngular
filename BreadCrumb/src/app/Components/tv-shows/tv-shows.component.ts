import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalBaseService } from 'src/app/Services/LocalBase/local-base.service';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent implements OnInit {

  TvShowIDURL:any = "";
  ServerIDURL:any = "";
  SeasonIdURL:any = "";
  EpisodeIdURL:any = "";
  showAllTvShows:boolean = true;
  TvShowTitles:any = [];
  CurrentTvShowTitle:any = {};
  CurrentTvShowSeasons:any = [];
  CurrentTvShowEpisodes:any = [];
  CurrentTvShowLinks:any =[];

  constructor(public LocalBase:LocalBaseService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.StartUpFun();
  }

  StartUpFun(){
    this.route.queryParams.subscribe(params => {
      this.ServerIDURL = params['ServerId'];
      this.TvShowIDURL = params['TvShowId'];
      this.SeasonIdURL = params['SeasonId'];
      this.EpisodeIdURL = params['EpisodeId'];

      if(this.TvShowIDURL == "" || this.TvShowIDURL == null || this.TvShowIDURL == undefined || this.ServerIDURL == "" || this.ServerIDURL == null || this.ServerIDURL == undefined){
        this.getAllTvShowTitles();
        this.showAllTvShows = true;
      }
      else{
        this.getTvShowById();
        if(this.SeasonIdURL != "" && this.SeasonIdURL != null && this.SeasonIdURL != undefined){
          this.getEpisodeBySeasonId();
          if(this.EpisodeIdURL != "" && this.EpisodeIdURL != null && this.EpisodeIdURL != undefined){
            this.getLinksByEpisodeId();
          }
        }
        this.showAllTvShows = false;
      }
    });
  }

  TvShowTitleClicked(ServerId:any, TvShowId:any){
    this.router.navigate(
      ['/TvShows'],
      { queryParams: { ServerId: ServerId, TvShowId: TvShowId} }
    );
  }

  TvShowSeasonClicked(SeasonId:any){
    this.router.navigate(
      ['/TvShows'],
      { queryParams: { ServerId: this.ServerIDURL, TvShowId: this.TvShowIDURL, SeasonId:SeasonId} }
    );
  }

  TvShowEpisodeClicked(EpisodeId:any){
    this.router.navigate(
      ['/TvShows'],
      { queryParams: { ServerId: this.ServerIDURL, TvShowId: this.TvShowIDURL, SeasonId:this.SeasonIdURL, EpisodeId: EpisodeId} }
    );
  }

  getAllTvShowTitles(){
    this.LocalBase.GetAllTvShows().subscribe((response:any) => {
      this.TvShowTitles = response;
    });
  }

  getTvShowById(){
    this.LocalBase.GetTvShowById(this.TvShowIDURL, this.ServerIDURL).subscribe((response:any) => {
      this.CurrentTvShowTitle = response;
    });

    this.LocalBase.GetSeasonsByTvShowId(this.TvShowIDURL, this.ServerIDURL).subscribe((response:any) => {
      this.CurrentTvShowSeasons = response;
      this.CurrentTvShowSeasons.sort((a:any,b:any) => a.Season_Number - b.Season_Number);
    });
  }

  getEpisodeBySeasonId(){
    this.LocalBase.GetEpisodesBySeasonId(this.SeasonIdURL, this.ServerIDURL).subscribe((response:any) => {
      this.CurrentTvShowEpisodes = response;
      this.CurrentTvShowEpisodes.sort((a:any,b:any) => a.Episode_Number - b.Episode_Number);
    });
  }

  getLinksByEpisodeId(){
    this.LocalBase.GetEpisodeLinksByEpisodeId(this.EpisodeIdURL, this.ServerIDURL).subscribe((response:any) => {
      this.CurrentTvShowLinks = response;
      console.log(response);
    });
  }

  refreshTvShows(){
    this.LocalBase.SaveTvShowsFromSheetAndSavetoLocalBase().subscribe((response:any) => {
      if(response == true){
        this.StartUpFun();
      }
    });
  }

}
