import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalBaseService } from 'src/app/Services/LocalBase/local-base.service';

@Component({
  selector: 'app-manga',
  templateUrl: './manga.component.html',
  styleUrls: ['./manga.component.css']
})
export class MangaComponent implements OnInit {

  MangaIDURL:any = "";
  ServerIDURL:any = "";
  VolumeIdURL:any = "";
  ChapterIdURL:any = "";
  showAllManga:boolean = true;
  MangaTitles:any = [];
  CurrentMangaTitle:any = {};
  CurrentMangaVolume:any = [];
  CurrentMangaChapter:any = [];
  CurrentMangaLinks:any =[];

  constructor(public LocalBase:LocalBaseService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.StartUpFun();
  }

  StartUpFun(){
    this.route.queryParams.subscribe(params => {
      this.ServerIDURL = params['ServerId'];
      this.MangaIDURL = params['MangaId'];
      this.VolumeIdURL = params['VolumeId'];
      this.ChapterIdURL = params['ChapterId'];

      if(this.MangaIDURL == "" || this.MangaIDURL == null || this.MangaIDURL == undefined || this.ServerIDURL == "" || this.ServerIDURL == null || this.ServerIDURL == undefined){
        this.getAllMangaTitles();
        this.showAllManga = true;
      }
      else{
        this.getMangaById();
        if(this.VolumeIdURL != "" && this.VolumeIdURL != null && this.VolumeIdURL != undefined){
          this.getChaptersByVolumeId();
          if(this.ChapterIdURL != "" && this.ChapterIdURL != null && this.ChapterIdURL != undefined){
            this.getLinksByChapterId();
          }
        }
        this.showAllManga = false;
      }
    });
  }

  MangaTitleClicked(ServerId:any, MangaId:any){
    this.router.navigate(
      ['/Manga'],
      { queryParams: { ServerId: ServerId, MangaId: MangaId} }
    );
  }

  MangaChapterClicked(ChapterId:any){
    this.router.navigate(
      ['/Manga'],
      { queryParams: { ServerId: this.ServerIDURL, MangaId: this.MangaIDURL, VolumeId: this.VolumeIdURL, ChapterId: ChapterId} }
    );
  }

  MangaVolumeClicked(VolumeId:any){
    this.router.navigate(
      ['/Manga'],
      { queryParams: { ServerId: this.ServerIDURL, MangaId: this.MangaIDURL, VolumeId:VolumeId} }
    );
  }

  getMangaById(){
    this.LocalBase.GetMangaById(this.MangaIDURL, this.ServerIDURL).subscribe((response:any) => {
      this.CurrentMangaTitle = response;
    });

    this.LocalBase.GetVolumesByMangaId(this.MangaIDURL, this.ServerIDURL).subscribe((response:any) => {
      this.CurrentMangaVolume = response;
      this.CurrentMangaVolume.sort((a:any,b:any) => a.Volume_Number - b.Volume_Number);
    });
  }

  getLinksByChapterId(){
    this.LocalBase.GetChaptersLinksByChapterId(this.ChapterIdURL, this.ServerIDURL).subscribe((response:any) => {
      this.CurrentMangaLinks = response;
    });
  }

  getChaptersByVolumeId(){
    this.LocalBase.GetChaptersByVolumeId(this.VolumeIdURL, this.ServerIDURL).subscribe((response:any) => {
      this.CurrentMangaChapter = response;
    });
  }

  getAllMangaTitles(){
    this.LocalBase.GetAllManga().subscribe((response:any) => {
      this.MangaTitles = response;
    });
  }

  refreshManga(){
    this.LocalBase.SaveMangaFromSheetAndSavetoLocalBase().subscribe((response:any) => {
      if(response == true){
        this.StartUpFun();
      }
    });
  }
}
