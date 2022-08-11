import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first, map, Observable } from 'rxjs';
import { NotesService } from 'src/app/core/_services/notes.service';
import { OnlineOfflineService } from 'src/app/core/_services/online-offline.service';
import { SelectedNoteService } from 'src/app/core/_services/selected-note.service';
import { Note } from 'src/app/_models/note';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit {
  noteList: [];
  constructor(
    private notesService: NotesService,
    private toastr: ToastrService,
    private router: Router,
    private selectedNoteService: SelectedNoteService,
    private onlineOfflineService: OnlineOfflineService
  ) {}

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes() {
    if (this.onlineOfflineService.isOnline) {
      this.notesService.getAllNotes().subscribe((data) => {
        this.noteList = data;
        console.log(this.noteList);
      });
    } else {
      this.notesService.getAllIndexedNotes().then((result) => {
        if (result) {
          this.noteList = result.filter((note) => {
            return !note.isDeletedOffline;
          });
        }

        console.log(this.noteList);
      });
    }
  }

  onDeleteNote(id, note) {
    if (confirm('Are you sure to delete?')) {
      if (this.onlineOfflineService.isOnline) {
        this.notesService.deleteNote(id).subscribe({
          next: () => {
            this.toastr.success('', 'Note Deleted!');
            this.router
              .navigateByUrl('/user', { skipLocationChange: true })
              .then(() => this.router.navigate(['/notes']));
          },
          error: (error) => {
            this.toastr.error('', error.error?.message);
          },
        });
      } else {
        if (id) {
          note.isDeletedOffline = true;
          this.notesService.updateToIndexDb(note.guid, note);
        } else {
          this.notesService.deleteIndexedNoteByGuid(note.guid);
          this.router
            .navigateByUrl('/user', { skipLocationChange: true })
            .then(() => this.router.navigate(['/notes']));
        }
      }
    }
  }

  sendSelectedNote(note) {
    this.selectedNoteService.selectNote(note);
  }
}
