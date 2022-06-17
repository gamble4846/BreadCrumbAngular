import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvidersService } from 'src/app/Services/DataProviders/data-providers.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuOpen:boolean = false;
  currentPage:String = "Home";
  menuList:any = [];

  constructor(private router:Router) {
    this.menuList = DataProvidersService.MenuList;
  }

  ngOnInit(): void {
  }

  MenuLinkClicked(route:any, pageName:any){
    this.menuOpen = !this.menuOpen;
    this.currentPage = pageName;
    setTimeout(() => {
      this.router.navigate(
        [route]
      );
    }, 500);
  }

  ToggleMenu(){
    this.menuOpen = !this.menuOpen;
  }
}
