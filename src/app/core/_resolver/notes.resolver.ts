import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { NotesService } from '../_services/notes.service';

@Injectable({
  providedIn: 'root',
})
export class NotesResolver implements Resolve<any> {
  constructor(private notesService: NotesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.notesService.getAllNotes();
  }
}
