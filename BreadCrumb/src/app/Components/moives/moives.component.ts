import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalBaseService } from 'src/app/Services/LocalBase/local-base.service';

@Component({
  selector: 'app-moives',
  templateUrl: './moives.component.html',
  styleUrls: ['./moives.component.css']
})
export class MoivesComponent implements OnInit {
  MovieIDURL:any = "";
  ServerIDURL:any = "";
  showAllMovies:boolean = true;
  MovieTitles:any = [];
  CurrentMovieLinks:any = [];
  CurrentMovieTitle:any = {};

  constructor(public LocalBase:LocalBaseService, private route: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    this.StartUpFun();
  }

  StartUpFun(){
    this.route.queryParams.subscribe(params => {
      this.ServerIDURL = params['ServerId'];
      this.MovieIDURL = params['MovieId'];

      if(this.MovieIDURL == "" || this.MovieIDURL == null || this.MovieIDURL == undefined || this.ServerIDURL == "" || this.ServerIDURL == null || this.ServerIDURL == undefined){
        this.getAllMoviesTitles();
        this.showAllMovies = true;
      }
      else{
        this.getMovieById();
        this.showAllMovies = false;
      }
    });
  }

  MovieTitleClicked(ServerId:any, MoviesId:any){
    this.router.navigate(
      ['/Movies'],
      { queryParams: { ServerId: ServerId, MovieId: MoviesId } }
    );
  }

  getAllMoviesTitles(){
    this.LocalBase.GetAllMovies().subscribe((response:any) => {
      this.MovieTitles = response;
    });
  }

  getMovieById(){
    this.LocalBase.GetMovieById(this.MovieIDURL, this.ServerIDURL).subscribe((response:any) => {
      this.CurrentMovieTitle = response;
    });

    this.LocalBase.GetMovieLinksByMovieId(this.MovieIDURL, this.ServerIDURL).subscribe((response:any) => {
      console.log(response);
      this.CurrentMovieLinks = response;
    });
  }

  refreshMovies(){
    this.LocalBase.SaveMoviesFromSheetAndSavetoLocalBase().subscribe((response:any) => {
      if(response == true){
        this.StartUpFun();
      }
    });
  }
}
