import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  findUserByUsername(username) {
    return this._http.get<any>(`${environment.apiUrl}/api/users/${username}`);
  }
}
