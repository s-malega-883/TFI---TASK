import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, first } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { Post } from "../models/Post";
import { Volunteer } from '../models/Volunteer';
import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  private url = "http://localhost:3000/volunteer";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 
      "Content-Type": "application/json"
    }),
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
      this.url, 
      { name: formData.name, 
        email: formData.email, 
        user: userId, 
        phone: formData.phone,
        city: formData.city, 
        languages: formData.languages, 
        availability: formData.availability
      }, this.httpOptions
    )
    .pipe(
      catchError(this.errorHandlerService.handleError<Volunteer>("createVolunteer"))
    );
}
}
