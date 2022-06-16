import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './Components/menu/menu.component';
import { HomeComponent } from './Components/home/home.component';
import { FoldersAndFilesComponent } from './Components/folders-and-files/folders-and-files.component';
import { MoivesComponent } from './Components/moives/moives.component';
import { BooksComponent } from './Components/books/books.component';
import { GamesComponent } from './Components/games/games.component';
import { TvShowsComponent } from './Components/tv-shows/tv-shows.component';
import { ComicsComponent } from './Components/comics/comics.component';
import { MangaComponent } from './Components/manga/manga.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    FoldersAndFilesComponent,
    MoivesComponent,
    BooksComponent,
    GamesComponent,
    TvShowsComponent,
    ComicsComponent,
    MangaComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
