import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RankingComponent } from './ranking/ranking.component';
import { LastSearchComponent } from './last-search/last-search.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full'
  },
  {
    path: 'Home',
    component: HomeComponent,
    pathMatch: 'full'
  },  
  {
    path: 'Ranking',
    component: RankingComponent,
    pathMatch: 'full'
  },  
  {
    path: 'LastSearch',
    component: LastSearchComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
