import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './Components/books/books.component';
import { FoldersAndFilesComponent } from './Components/folders-and-files/folders-and-files.component';
import { HomeComponent } from './Components/home/home.component';
import { MoivesComponent } from './Components/moives/moives.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Home' },
  { path: 'Home', component: HomeComponent},
  { path: 'FoldersAndFiles', component: FoldersAndFilesComponent},
  { path: 'Movies', component: MoivesComponent},
  { path: 'Books', component: BooksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
