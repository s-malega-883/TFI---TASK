import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';

import { NavComponent } from './comps/nav/nav.component';
import { SignupComponent } from './comps/signup/signup.component';
import { LoginComponent } from './comps/login/login.component';
import { HomeComponent } from './comps/home/home.component';
import { PostsComponent } from './comps/posts/posts.component';
import { ProgramComponent } from './comps/program/program.component';
import { VolunteerComponent } from './comps/volunteer/volunteer.component';
import { ViewListComponent } from './comps/view-list/view-list.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "volunteer", component: VolunteerComponent },
  { path: "view_list", component: ViewListComponent },
  { path: "program", component: ProgramComponent },
  { path: "posts", component: PostsComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "**", redirectTo: "" },
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
