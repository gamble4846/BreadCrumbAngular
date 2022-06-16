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
