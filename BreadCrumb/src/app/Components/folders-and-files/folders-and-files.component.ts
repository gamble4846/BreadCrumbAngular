import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataProvidersService } from 'src/app/Services/DataProviders/data-providers.service';
import { LocalBaseService } from 'src/app/Services/LocalBase/local-base.service';

@Component({
  selector: 'app-folders-and-files',
  templateUrl: './folders-and-files.component.html',
  styleUrls: ['./folders-and-files.component.css']
})
export class FoldersAndFilesComponent implements OnInit {
  ServersList:any;
  FoldersFilesObj:any = {
    Folders: [],
    Files: [],
    ServerId: ""
  };

  finalTableData:any;
  ServerIDURL:string = "";
  UpperFolderIDURL:string = "";
  onlyServers:boolean = false;
  currentLocation:any = [];

  constructor(public LocalBase:LocalBaseService,private route: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    this.StartUpFun();
  }

  ShowAllServers(){
    this.currentLocation = [];
    this.router.navigate(
      ['/FoldersAndFiles']
    );
  }

  ServerClicked(ServerId:any){
    this.router.navigate(
      ['/FoldersAndFiles'],
      { queryParams: { ServerId: ServerId } }
    );
  }

  FolderClicked(ServerId:any, FolderId:any){
    this.router.navigate(
      ['/FoldersAndFiles'],
      { queryParams: { ServerId: ServerId, FolderId: FolderId } }
    );
  }

  StartUpFun(){
    this.route.queryParams.subscribe(params => {
      this.ServerIDURL = params['ServerId'];
      this.UpperFolderIDURL = params['FolderId'] == "" || params['FolderId'] == null || params['FolderId'] == undefined ? "-" : params['FolderId'];

      if(this.ServerIDURL == "" || this.ServerIDURL == null || this.ServerIDURL == undefined){
        this.getServerList();
        this.onlyServers = true;
      }
      else{
        this.getFoldersFiles();
        this.onlyServers = false;
      }
    });
  }

  getCurrentLocation(){
    this.currentLocation = [];
    if(this.UpperFolderIDURL != "-"){
      this.LocalBase.GetAllFodlersByServerID(this.ServerIDURL).subscribe((response:any) => {
        let allFolders = response;
        this.currentLocation.push(allFolders.find((x:any) => x.Folder_Id == this.UpperFolderIDURL));
        while(this.currentLocation[this.currentLocation.length - 1].Folder_UpperFolderId != "-"){
          this.currentLocation.push(
            allFolders.find((x:any) => x.Folder_Id == this.currentLocation[this.currentLocation.length - 1].Folder_UpperFolderId)
          );
        }
        this.currentLocation.reverse();
      });
    }
  }

  getServerList(){
    this.LocalBase.GetFoldersFilesServersList().subscribe((response:any) => {
      this.ServersList = response;
      this.finalTableData = this.ServersList;
    });
  }

  getFoldersFiles(){
    this.LocalBase.GetFoldersFilesByUpperFolderID(this.UpperFolderIDURL,this.ServerIDURL).subscribe((response:any) => {
      this.FoldersFilesObj = response;
      this.finalTableData = this.FoldersFilesObj;
      this.getCurrentLocation();
    });
  }

  refreshFilesAndFolders(){
    this.LocalBase.SaveFoldersFilesFromSheetAndSavetoLocalBase().subscribe((response:any) => {
      if(response == true){
        this.StartUpFun();
      }
    });
  }

  getFileLinks(FileId:any){
    this.LocalBase.GetFilesLinkByFileID(FileId,this.ServerIDURL).subscribe((response:any) => {
      console.log(response);
    });
  }

  GetIconSRC(iconName:string){
    return DataProvidersService.GetIconSRC(iconName);
  }
}
