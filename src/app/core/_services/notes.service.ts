import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from '../../_models/note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private noteSubject: BehaviorSubject<Note>;
  public note: Observable<Note>;

  constructor(private _http: HttpClient) {}

  addNote(note: Note) {
    return this._http.post<Note>(`${environment.apiUrl}/api/notes`, note);
  }

  getAllNotes() {
    return this._http.get<any>(`${environment.apiUrl}/api/notes`);
  }

  deleteNote(id) {
    return this._http.delete<any>(`${environment.apiUrl}/api/notes/${id}`);
  }

  getNoteById(id) {
    return this._http.get<any>(`${environment.apiUrl}/api/notes/${id}`);
  }
}
