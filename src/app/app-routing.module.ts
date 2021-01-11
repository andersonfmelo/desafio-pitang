import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RankingComponent } from './ranking/ranking.component';
import { LastSearchComponent } from './last-search/last-search.component';


const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },  
  {
    path: 'home',
    component: HomeComponent,
  },  
  {
    path: 'ranking',
    component: RankingComponent,
  },  
  {
    path: 'lastsearch',
    component: LastSearchComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
