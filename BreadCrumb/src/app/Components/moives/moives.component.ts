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
  FilteredMovieTitles:any = [];
  CurrentMovieLinks:any = [];
  CurrentMovieTitle:any = {};
  MovieSearchTerm:any = "";
  MovieSortingType:any = "";
  MovieFilterGenre:any = "";
  NoOfMoviePerPage:any = "";
  CurrentMoviePage:any = "";
  AllSortingTypes: any = [];
  TotalPages:number = 0;
  SearchValue:any = "";
  AllGenres:any = [];
  selectedGenre:any = [];

  constructor(public LocalBase:LocalBaseService, private route: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    this.StartUpFun();
  }

  StartUpFun(){
    this.route.queryParams.subscribe(params => {
      this.ServerIDURL = params['ServerId'];
      this.MovieIDURL = params['MovieId'];
      this.MovieSearchTerm = params['MovieSearchTerm'];
      this.MovieSortingType = params['MovieSortingType'];
      this.MovieFilterGenre = params['MovieFilterGenre'];
      this.NoOfMoviePerPage = params['NoOfMoviePerPage'];
      this.CurrentMoviePage = params['CurrentMoviePage'];

      if(this.MovieIDURL == "" || this.MovieIDURL == null || this.MovieIDURL == undefined || this.ServerIDURL == "" || this.ServerIDURL == null || this.ServerIDURL == undefined){
        this.getFilteringValuesMovies();
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

  ChangeCurrentPage(newPage:number){
    this.CurrentMoviePage = newPage;
    this.router.navigate(
      ['/Movies'],
      { queryParams: {MovieSearchTerm: this.MovieSearchTerm, MovieSortingType: this.MovieSortingType, MovieFilterGenre: this.MovieFilterGenre, NoOfMoviePerPage: this.NoOfMoviePerPage, CurrentMoviePage: this.CurrentMoviePage}}
    );
  }

  UpdateGenre(){
    this.MovieFilterGenre = this.selectedGenre.toString();
    this.router.navigate(
      ['/Movies'],
      { queryParams: {MovieSearchTerm: this.MovieSearchTerm, MovieSortingType: this.MovieSortingType, MovieFilterGenre: this.MovieFilterGenre, NoOfMoviePerPage: this.NoOfMoviePerPage, CurrentMoviePage: this.CurrentMoviePage}}
    );
  }

  UpdateSearch(){
    this.MovieSearchTerm = this.SearchValue;
    this.router.navigate(
      ['/Movies'],
      { queryParams: {MovieSearchTerm: this.MovieSearchTerm, MovieSortingType: this.MovieSortingType, MovieFilterGenre: this.MovieFilterGenre, NoOfMoviePerPage: this.NoOfMoviePerPage, CurrentMoviePage: this.CurrentMoviePage}}
    );
  }

  UpdatePageCount(){
    this.router.navigate(
      ['/Movies'],
      { queryParams: {MovieSearchTerm: this.MovieSearchTerm, MovieSortingType: this.MovieSortingType, MovieFilterGenre: this.MovieFilterGenre, NoOfMoviePerPage: this.NoOfMoviePerPage, CurrentMoviePage: this.CurrentMoviePage}}
    );
  }

  getFilteringValuesMovies(){
    this.AllSortingTypes = ["AZ_ASC", "AZ_DESC", "YEAR_ASC", "YEAR_DESC", "ADDED_ASC", "ADDED_DESC"];

    this.MovieSearchTerm = this.MovieSearchTerm == "" || this.MovieSearchTerm == null || this.MovieSearchTerm == undefined ? "" : this.MovieSearchTerm;
    this.MovieSortingType = this.MovieSortingType == "" || this.MovieSortingType == null || this.MovieSortingType == undefined || (!this.AllSortingTypes.includes(this.MovieSortingType.toUpperCase())) ? "ADDED_DESC" : this.MovieSortingType;
    this.MovieFilterGenre = this.MovieFilterGenre == "" || this.MovieFilterGenre == null || this.MovieFilterGenre == undefined ? "" : this.MovieFilterGenre;

    this.MovieSearchTerm = this.MovieSearchTerm.toUpperCase();
    this.MovieSortingType = this.MovieSortingType.toUpperCase();
    this.MovieFilterGenre = this.MovieFilterGenre.toUpperCase();

    try{
      this.NoOfMoviePerPage = this.NoOfMoviePerPage == "" || this.NoOfMoviePerPage == null || this.NoOfMoviePerPage == undefined ? "10" : this.NoOfMoviePerPage;
      this.NoOfMoviePerPage = parseInt(this.NoOfMoviePerPage);
      this.NoOfMoviePerPage = this.NoOfMoviePerPage + "" == "NaN" || this.NoOfMoviePerPage < 30 ? 30 : this.NoOfMoviePerPage;
    }
    catch(ex){
      this.NoOfMoviePerPage = 30;
    }

    try{
      this.CurrentMoviePage = this.CurrentMoviePage == "" || this.CurrentMoviePage == null || this.CurrentMoviePage == undefined ? "1" : this.CurrentMoviePage;
      this.CurrentMoviePage = parseInt(this.CurrentMoviePage);
      this.CurrentMoviePage = this.CurrentMoviePage + "" == "NaN" || this.CurrentMoviePage == 0 ? 1 : this.CurrentMoviePage;
    }
    catch(ex){
      this.CurrentMoviePage = 1;
    }

    this.GetAllMovies();
  }

  GetAllMovies(){
    this.LocalBase.GetAllMovies().subscribe((response:any) => {
      this.MovieTitles = response;
      this.MovieTitles.forEach((title:any) => {
        let thisGenre = title.Movies_Genre.split(", ");
        this.AllGenres = this.AllGenres.concat(thisGenre);
      });
      this.AllGenres = this.AllGenres.filter((v:any, i:any, a:any) => a.indexOf(v) === i);
      this.FilterMovies();
    });
  }

  FilterMovies(){
    this.FilteredMovieTitles = this.MovieTitles;
    //Search Filter
    this.FilteredMovieTitles = this.FilteredMovieTitles.filter((x:any) => (x.Movies_MainName.toString().toUpperCase()).includes(this.MovieSearchTerm) || (x.Movies_AltNames.toString().toUpperCase()).includes(this.MovieSearchTerm) || (x.Movie_IMDB_ID.toString().toUpperCase()).includes(this.MovieSearchTerm))
    //Genre Filter
    this.FilteredMovieTitles = this.FilteredMovieTitles.filter((x:any) => {
      let genres = this.MovieFilterGenre.split(",");
      let flag = false;
      genres.forEach((gen:any) => {
        if(x.Movies_Genre.toUpperCase().includes(gen)){
          flag = true;
        }
      });
      return flag;
    });
    //Total Pages
    this.TotalPages =  Math.ceil(this.FilteredMovieTitles.length / this.NoOfMoviePerPage);
    //Managing Current Page
    this.CurrentMoviePage = this.CurrentMoviePage > this.TotalPages ? this.TotalPages : this.CurrentMoviePage;
    //Sorting ["AZ_ASC", "AZ_DESC", "YEAR_ASC", "YEAR_DESC", "ADDED_ASC", "ADDED_DESC"]
    switch(this.MovieSortingType){
      case "AZ_ASC":
        this.FilteredMovieTitles.sort((a:any, b:any) => a.Movies_MainName.toString().localeCompare(b.Movies_MainName.toString()));
        break;
      case "AZ_DESC":
        this.FilteredMovieTitles.sort((a:any, b:any) => b.Movies_MainName.toString().localeCompare(a.Movies_MainName.toString()));
        break;
      case "YEAR_ASC":
        this.FilteredMovieTitles.sort((a:any, b:any) => a.Movies_ReleaseYear.toString().localeCompare(b.Movies_ReleaseYear.toString()));
        break;
      case "YEAR_DESC":
        this.FilteredMovieTitles.sort((a:any, b:any) => b.Movies_ReleaseYear.toString().localeCompare(a.Movies_ReleaseYear.toString()));
        break;
      case "ADDED_ASC":
        //do nothing
        break;
      case "ADDED_DESC":
        this.FilteredMovieTitles.reverse();
        break;
      default:
        break;
    }
    //Paginate
    this.FilteredMovieTitles = this.FilteredMovieTitles.slice((this.CurrentMoviePage - 1) * this.NoOfMoviePerPage, this.CurrentMoviePage * this.NoOfMoviePerPage);
  }

  getMovieById(){
    this.LocalBase.GetMovieById(this.MovieIDURL, this.ServerIDURL).subscribe((response:any) => {
      this.CurrentMovieTitle = response;
    });

    this.LocalBase.GetMovieLinksByMovieId(this.MovieIDURL, this.ServerIDURL).subscribe((response:any) => {
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
