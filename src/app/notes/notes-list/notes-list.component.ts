import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first, map, Observable } from 'rxjs';
import { NotesService } from 'src/app/core/_services/notes.service';
import { Note } from 'src/app/_models/note';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit {
  noteList = this.getNotes();
  constructor(
    private notesService: NotesService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getNotes() {
    this.notesService.getAllNotes().subscribe((data) => {
      this.noteList = data;
    });
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
}
