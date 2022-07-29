
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private http: HttpClient
  ) { }


  register(user: User) {
    return this.http.post(`${environment.apiUrl}/api/users`, user);
  }

  login(username, password){
    return this.http.post(`${environment.apiUrl}/api/auth/login`, {username, password});
  }

}
