import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs";

// import { PostService } from "src/app/services/post.service";
import { ViewListService } from 'src/app/services/view-list.service';
import { Volunteer } from 'src/app/models/Volunteer';
import { AuthService } from "src/app/services/auth.service";

// import { Post } from "src/app/models/Post";
import { View_List } from 'src/app/models/View_List';
import { User } from "src/app/models/User";
import { VolunteerService } from 'src/app/services/volunteer.service';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent implements OnInit{

  view$:any;
  userId: Pick<User, "id"> | number;

  constructor(
    private viewListService: ViewListService,
    private authService: AuthService,
    private volunteerService: VolunteerService
  ) {}

  ngOnInit(): void {
    this.fetchAll().subscribe(
      (response) => {
        this.view$ = response;
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );;
    this.userId = this.authService.userId;

  }

  fetchAll(): Observable<Volunteer[]> {
    return this.volunteerService.fetchAll();
  }

  createVolunteer(): void {
    this.view$ = this.fetchAll();
  }

}
