import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalBaseService } from 'src/app/Services/LocalBase/local-base.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {

  ComicIDURL:any = "";
  ServerIDURL:any = "";
  IssueIdURL:any = "";
  showAllComics:boolean = true;
  ComicsTitles:any = [];
  CurrentComicsTitle:any = {};
  CurrentComicsIssues:any = [];
  CurrentComicsLinks:any =[];

  constructor(public LocalBase:LocalBaseService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.StartUpFun();
  }

  StartUpFun(){
    this.route.queryParams.subscribe(params => {
      this.ServerIDURL = params['ServerId'];
      this.ComicIDURL = params['ComicId'];
      this.IssueIdURL = params['IssueId'];

      if(this.ComicIDURL == "" || this.ComicIDURL == null || this.ComicIDURL == undefined || this.ServerIDURL == "" || this.ServerIDURL == null || this.ServerIDURL == undefined){
        this.getAllComicsTitles();
        this.showAllComics = true;
      }
      else{
        this.getComicsById();
        if(this.IssueIdURL != "" && this.IssueIdURL != null && this.IssueIdURL != undefined){
          this.getIssueLinksByIssueId();
        }
        this.showAllComics = false;
      }
    });
  }

  getIssueLinksByIssueId(){
    this.LocalBase.GetIssuesLinksByIssueId(this.IssueIdURL, this.ServerIDURL).subscribe((response:any) => {
      this.CurrentComicsLinks = response;
    });
  }

  getComicsById(){
    this.LocalBase.GetComicsById(this.ComicIDURL, this.ServerIDURL).subscribe((response:any) => {
      this.CurrentComicsTitle = response;
    });

    this.LocalBase.GetIssuesByComicId(this.ComicIDURL, this.ServerIDURL).subscribe((response:any) => {
      this.CurrentComicsIssues = response;
      this.CurrentComicsIssues.sort((a:any,b:any) => a.Issue_Number - b.Issue_Number);
    });
  }

  ComicsTitleClicked(ServerId:any, ComicId:any){
    this.router.navigate(
      ['/Comics'],
      { queryParams: { ServerId: ServerId, ComicId: ComicId} }
    );
  }

  ComicsIssuesClicked(IssueId:any){
    this.router.navigate(
      ['/Comics'],
      { queryParams: { ServerId: this.ServerIDURL, ComicId: this.ComicIDURL, IssueId: IssueId} }
    );
  }

  getAllComicsTitles(){
    this.LocalBase.GetAllComics().subscribe((response:any) => {
      this.ComicsTitles = response;
    });
  }

  refreshComics(){
    this.LocalBase.SaveComicsFromSheetAndSavetoLocalBase().subscribe((response:any) => {
      if(response == true){
        this.StartUpFun();
      }
    });
  }

}
