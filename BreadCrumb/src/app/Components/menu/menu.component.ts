import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuOpen:boolean = false;
  currentPage:String = "Home";

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  MenuLinkClicked(route:any, pageName:any){
    this.menuOpen = !this.menuOpen;
    this.router.navigate(
      [route]
    );
    this.currentPage = pageName;
  }

  ToggleMenu(){
    this.menuOpen = !this.menuOpen;
  }
}
