import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, first } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { Post } from "../models/Post";
import { View_List } from '../models/View_List';
import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";
import { Volunteer } from '../models/Volunteer';

@Injectable({
  providedIn: 'root'
})
export class ViewListService {

  private url = "http://localhost:3000/view_list";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  fetchAll(): Observable<Volunteer[]> {
    return this.http
      .get<Volunteer[]>(this.url, {responseType: "json"})
      .pipe(
        catchError(this.errorHandlerService.handleError<Volunteer[]>("fetchAll",[]))
      );
  }

  createVolunteer(formData: Partial<Volunteer>, userId: Pick<User, "id">): Observable<Volunteer>{
    return this.http
    .post<Volunteer>(
      this.url, {name: formData.name, email: formData.email, user: userId}, this.httpOptions
    )
    .pipe(
      catchError(this.errorHandlerService.handleError<Volunteer>("createVolunteer"))
    );
}
}
