import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/_models/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }
  register(user: User) {
    return this.http.post(`${environment.apiUrl}/api/users`, user);
  }

  login(username, password) {
    return this.http
      .post(`${environment.apiUrl}/api/auth/login`, {
        username,
        password,
      })
      .pipe(
        map((user: User) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    //remove user from local storage to log user out
    if (localStorage.getItem('currentUser'))
      localStorage.removeItem('currentUser');
  }
}
