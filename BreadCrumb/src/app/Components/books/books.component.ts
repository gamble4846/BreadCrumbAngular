import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalBaseService } from 'src/app/Services/LocalBase/local-base.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  BookIDURL:any = "";
  ServerIDURL:any = "";
  showAllBooks:boolean = true;
  BookTitles:any = [];
  CurrentBookLinks:any = [];
  CurrentBookTitle:any = {};

  constructor(public LocalBase:LocalBaseService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.StartUpFun();
  }

  StartUpFun(){
    this.route.queryParams.subscribe(params => {
      this.ServerIDURL = params['ServerId'];
      this.BookIDURL = params['BookId'];

      if(this.BookIDURL == "" || this.BookIDURL == null || this.BookIDURL == undefined || this.ServerIDURL == "" || this.ServerIDURL == null || this.ServerIDURL == undefined){
        this.getAllBooksTitles();
        this.showAllBooks = true;
      }
      else{
        this.getBookById();
        this.showAllBooks = false;
      }
    });
  }

  BookTitleClicked(ServerId:any, BookId:any){
    this.router.navigate(
      ['/Books'],
      { queryParams: { ServerId: ServerId, BookId: BookId } }
    );
  }

  getAllBooksTitles(){
    this.LocalBase.GetAllBooks().subscribe((response:any) => {
      this.BookTitles = response;
    });
  }

  getBookById(){
    this.LocalBase.GetBookById(this.BookIDURL, this.ServerIDURL).subscribe((response:any) => {
      this.CurrentBookTitle = response;
    });

    this.LocalBase.GetBookLinksByMovieId(this.BookIDURL, this.ServerIDURL).subscribe((response:any) => {
      this.CurrentBookLinks = response;
    });
  }

  refreshBooks(){
    this.LocalBase.SaveBooksFromSheetAndSavetoLocalBase().subscribe((response:any) => {
      if(response == true){
        this.StartUpFun();
      }
    });
  }
}
