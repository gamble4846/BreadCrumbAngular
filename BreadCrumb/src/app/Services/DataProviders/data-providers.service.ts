import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataProvidersService {

  constructor() { }

  public static MenuList = [
    {route:"/Home",value:"Home",name:"Home"},
    {route:"/Movies",value:"Movies",name:"Movies"},
    {route:"/TvShows",value:"TvShows",name:"TvShows"},
    {route:"/Books",value:"Books",name:"Books"},
    {route:"/Games",value:"Games",name:"Games"},
    {route:"/Manga",value:"Manga",name:"Manga"},
    {route:"/Comics",value:"Comics",name:"Comics"},
    {route:"/FoldersAndFiles",value:"FoldersAndFiles",name:"Folders And Files"}
  ];

  public static GetIconSRC(iconName:string){
    iconName = iconName.toLowerCase();
    switch(iconName){
      case "info":
        return `../../../assets/files-folders/info.png`;
      case "server":
        return `../../../assets/files-folders/server.png`;
      case "folder":
        return `../../../assets/files-folders/folder.png`;
      case "application/zip":
        return `../../../assets/files-folders/zip.png`;
      case "text/plain":
        return `../../../assets/files-folders/text-plain.png`;
      default:
        return `../../../assets/files-folders/question-mark.png`;
    }
  }
}
