import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Places, Place } from '../Place';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private apiUrl = 'https://places-dsn.algolia.net/1/places';

  constructor(private http: HttpClient) {}

  getPlaces(place: string): Observable<Places> {
    this.checkAuth();
    return this.http.post<Places>(
      `${this.apiUrl}/query`,
      { query: place },
      httpOptions
    );
  }

  getPlace(place: string): Observable<Place> {
    this.checkAuth();
    return this.http.get<Place>(`${this.apiUrl}/${place}`, httpOptions);
  }

  checkAuth(): void {
    if (environment.auth) {
      httpOptions.headers = httpOptions.headers.append(
        'Authorization',
        `Basic ${btoa(environment.username + ':' + environment.password)})`
      );
    }
  }
}
