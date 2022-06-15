import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoldersAndFilesComponent } from './Components/folders-and-files/folders-and-files.component';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Home' },
  { path: 'Home', component: HomeComponent},
  { path: 'FoldersAndFiles', component: FoldersAndFilesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
