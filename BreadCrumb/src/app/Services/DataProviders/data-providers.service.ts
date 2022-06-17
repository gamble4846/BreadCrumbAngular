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
        return `https://lh3.googleusercontent.com/pw/AM-JKLVY5JSCBCMBaLklKzdCcddvvipFox2mu7kKMvQ2sZTqk5_N0DRseU8ONxeBLeccq-fIhnELxEhXfuF5RSu8r9bJT9KwhRfQ5dwYLdo4_CvXgifye-Io1zHx-pCwSHu2iv30gsAAw6Fuwzc9aikO-ghY=s100-no?authuser=0`;
      case "server":
        return `https://lh3.googleusercontent.com/pw/AM-JKLV9CB_kXojlv7N6GJttYNn_wfWvutQB5hTA079ZA0kOmugV7O6Cqf8_vk88J8oUdINSISETDv0cPbK1gdnySRx9m0ao77pmBeX_3KoJet7pb7uCT1R4UzDOaDERDwg99MnzadCneGHSgiB_9pWZAH39=s100-no?authuser=0`;
      case "folder":
        return `https://lh3.googleusercontent.com/pw/AM-JKLV-sEyiJVL6r6C_9iw6EPCUaSFw1NqSPUcq4eZuqyC1Oc9I9N2cx3zveL7FNlUmBrozRxsoHFmTHF3ON2gvn5pIlo5Fs6Cq8izOa-KBJOs43rsa0Y8YiMWLreOrpKP8KyioC7tFSFpVM68Xg4h7KnIO=s512-no?authuser=0`;
      case "application/zip":
        return `https://lh3.googleusercontent.com/pw/AM-JKLVVmgCf4fFPJMDYSKGY7XezP-cpsQabbn-cseGkB3N7Ra-Bh0e4721bLswIf9SvICOSPNFluLL8-BciNT7jTSl9W3vCXCp8XaNt-I0AyKOjMewlIWKntrEn0G5gQ3UuDTrqDe9rmZx5b89gqCqWxAu0=s300-no?authuser=0`;
      case "text/plain":
        return `https://lh3.googleusercontent.com/pw/AM-JKLVeHUIyMYCR_SfStQ63xkA_F4UXjawVNIGkiLZeMt8SoaTUsNeSUb19y5ivaub02t6mTT1qJRU-MmFRqUy-bMpptfvmYCd0jkIun58abswophXHBc8a1-xlWIJBiNSFac1VBByEpV-J2yXmzE5Yrfzg=s300-no?authuser=0`;
      default:
        return `https://lh3.googleusercontent.com/pw/AM-JKLW-xjNDGYyErbwr5KbkYRc9awI1mp53EioZ5l9JjAP6fR59IbeFK2GIOtw1_bri7oE4yOfs0iJG3_fSuyRbc5CBvkZ9IdI11NkCiIWmVPjOdyBuVk3S366BEzOz607M3sqbGaMX29GCV-7fQzooY80U=s50-no?authuser=0`;
    }
  }
}
