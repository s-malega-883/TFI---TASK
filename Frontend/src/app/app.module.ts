import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";

import { NavComponent } from "./comps/nav/nav.component";
import { SignupComponent } from "./comps/signup/signup.component";
import { LoginComponent } from "./comps/login/login.component";
import { HomeComponent } from "./comps/home/home.component";
import { PostsComponent } from "./comps/posts/posts.component";
import { CreatePostComponent } from "./comps/create-post/create-post.component";

import { AuthInterceptorService } from "./services/auth-interceptor.service";
import { ProgramComponent } from './comps/program/program.component';
import { VolunteerComponent } from './comps/volunteer/volunteer.component';
import { ViewListComponent } from './comps/view-list/view-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PostsComponent,
    CreatePostComponent,
    ProgramComponent,
    VolunteerComponent,
    ViewListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
