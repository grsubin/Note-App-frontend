import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Dexie from 'dexie';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as uuid from 'uuid';
import { Note } from '../../_models/note';
import { OnlineOfflineService } from './online-offline.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private noteSubject: BehaviorSubject<Note>;
  public notes: Observable<any>;
  public offlineNoteList: [];
  public noteList: Observable<any>;
  public noteList$: BehaviorSubject<any>;

  private db: any;

  constructor(
    private _http: HttpClient,
    private readonly onlineOfflineService: OnlineOfflineService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.registerToEvents(onlineOfflineService);
    console.log('constructor');
    this.createDatabase();
  }

  private registerToEvents(onlineOfflineService: OnlineOfflineService) {
    onlineOfflineService.connectionChanged.subscribe((online) => {
      if (online) {
        console.log('went online');
        console.log('sending all stored items');

        this.sendItemsFromIndexedDb();
      } else {
        console.log('went offline, storing in indexDB');

        this._http
          .get<any>(`${environment.apiUrl}/api/notes`)
          .subscribe((data) => {
            this.offlineNoteList = data;
            if (this.offlineNoteList) {
              this.offlineNoteList.forEach((note) => {
                console.log('saving to IndexedDB: ');
                console.log(note);
                this.addToIndexedDb(note);
              });
            }

            console.log(data);
          });
      }
    });
  }
  addNote(note) {
    if (!this.onlineOfflineService.isOnline) {
      note.guid = uuid.v4();
      note.isCreatedOffline = true;

      this.addToIndexedDb(note);
    } else {
      console.log(note);
      return this._http.post<Note>(`${environment.apiUrl}/api/notes`, note);
    }
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

  updateNoteById(id, note) {
    if (!this.onlineOfflineService.isOnline) {
      this.updateToIndexDb(note.guid, note);
    } else {
      return this._http.put<any>(`${environment.apiUrl}/api/notes/${id}`, note);
    }
  }

  private createDatabase() {
    this.db = new Dexie('NoteAppDatabase');

    this.db.version(1).stores({
      notes:
        'guid, title, body, created_at, updated_at, isUpdatedOffline, isCreatedOffline, isDeletedOffline',
    });
    this.db.open().catch((e) => {
      console.error('Open failed: ' + e);
    });
  }

  addToIndexedDb(note) {
    this.db.notes
      .add(note)
      .then(async () => {
        const allNotes = await this.db.notes.toArray();
        console.log('saved in DB, DB is now', allNotes);
        this.toastr.success('', 'Added Note');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['user/notes']));
      })
      .catch((e) => {
        console.log(e.stack || e);
        this.toastr.error('', e.stack || e);
      });
  }

  updateToIndexDb(guid, note) {
    note.isUpdatedOffline = true;
    this.db.notes
      .update(guid, note)
      .then((updated) => {
        if (updated) {
          console.log(`Note ${guid} is updated`);
          this.toastr.success('', 'Note Updated!');
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['user/notes']));
        } else {
          console.log('Nothing was updated.');
        }
      })
      .catch((e) => {
        console.log(e.stack || e);
        this.toastr.error('', e.stack || e);
      });
  }

  async sendItemsFromIndexedDb() {
    const allNotes = await this.db.notes.toArray();
    allNotes.forEach((note) => {
      if (
        note.isUpdatedOffline &&
        !note.isCreatedOffline &&
        !note.isDeletedOffline
      ) {
        this.updateNoteById(note.id, note).subscribe({
          next: () => {
            this.toastr.success('', 'Synced Notes-updated');
          },
        });
      } else if (note.isDeletedOffline) {
        this.deleteNote(note.id).subscribe({
          next: () => {
            this.toastr.success('', 'Synced Notes-deleted');
          },
        });
      } else {
        this.addNote(note).subscribe({
          next: () => {
            this.toastr.success('', 'Synced Notes-added');
          },
        });
      }

      this.db.notes.delete(note.guid).then(() => {
        console.log(`item ${note.guid} sent and deleted locally`);
      });
    });
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['user/notes']));
  }

  public deleteIndexedNoteByGuid(guid) {
    this.db.notes.delete(guid).then(() => {
      this.toastr.success('', 'Note Deleted!');
      console.log(`item ${guid} sent and deleted locally`);
    });
  }

  public async getAllIndexedNotes() {
    console.log(await this.db.notes.toArray());
    return await this.db.notes.toArray();
  }
}
