import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface User {
  email: string;
  password: string;
  terms: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MockRegisterService {
  constructor() {}

  registerUser(user: User): Observable<User> {
    return of(user);
  }
}
