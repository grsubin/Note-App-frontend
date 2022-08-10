import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { NotesService } from '../_services/notes.service';
import { OnlineOfflineService } from '../_services/online-offline.service';

@Injectable({
  providedIn: 'root',
})
export class NotesResolver implements Resolve<any> {
  constructor(
    private notesService: NotesService,
    private onlineOfflineService: OnlineOfflineService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    if (this.onlineOfflineService.isOnline) {
      return this.notesService.getAllNotes();
    }
  }
}
