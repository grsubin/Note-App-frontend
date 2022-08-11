import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first, Subscription } from 'rxjs';
import { NotesService } from 'src/app/core/_services/notes.service';
import { SelectedNoteService } from 'src/app/core/_services/selected-note.service';
import { Note } from 'src/app/_models/note';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss'],
})
export class NoteEditComponent implements OnInit {
  noteForm: FormGroup;
  note: Note;
  id: number;
  loading = false;
  submitted = false;
  selectedNoteSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private notesService: NotesService,
    private toastr: ToastrService,
    private router: Router,
    private selectedNoteService: SelectedNoteService
  ) {}

  ngOnInit(): void {
    this.selectedNoteSubscription =
      this.selectedNoteService.getSelectedNote.subscribe({
        next: (note) => {
          this.note = note;
          console.log(this.note);
        },
        error: (error) => {
          console.log(error);
        },
      });
    this.noteForm = this.formBuilder.group({
      title: [this.note.title],
      body: [this.note.body],
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    console.log('sub deleted');
    this.selectedNoteSubscription.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;

    this.loading = true;
    this.noteForm.value.guid = this.note.guid;
    this.notesService
      .updateNoteById(this.note.id, this.noteForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastr.success('', 'Note Updated!');
          console.log(this.route);
          this.router
            .navigateByUrl('/user', { skipLocationChange: true })
            .then(() => this.router.navigate(['/notes']));
        },
      });
  }
}
