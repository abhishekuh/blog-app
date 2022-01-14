import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path: 'home',component:HomeComponent},
  {path: 'blog-detail/:id',component:BlogDetailComponent},
  {path:'about',component:AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
