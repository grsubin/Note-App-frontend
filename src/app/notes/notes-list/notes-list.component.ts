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
        console.log(data);
        this.noteList = data;
      });
    } else {
      this.notesService.getAllIndexedNotes().then((result) => {
        this.noteList = result;
      });
    }
  }

  onDeleteNote(id) {
    if (confirm('Are you sure to delete?')) {
      this.notesService.deleteNote(id).subscribe({
        next: () => {
          this.toastr.success('', 'Note Deleted!');
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['user/notes']));
        },
        error: (error) => {
          this.toastr.error('', error.error?.message);
        },
      });
    }
  }

  sendSelectedNote(note) {
    this.selectedNoteService.selectNote(note);
  }
}
