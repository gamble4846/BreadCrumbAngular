import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvidersService } from 'src/app/Services/DataProviders/data-providers.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  menuList:any = [];
  constructor(private router:Router) {
    this.menuList = DataProvidersService.MenuList;
  }

  ngOnInit(): void {
  }

  FooterLinkClicked(route:any){
    this.router.navigate(
      [route]
    );
  }

}
