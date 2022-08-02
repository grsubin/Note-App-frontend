import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { NotesService } from 'src/app/core/_services/notes.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private notesService: NotesService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getNoteById();
    this.noteForm = this.formBuilder.group({
      title: [''],
      body: [''],
    });
  }

  getNoteById() {
    this.route.params.subscribe((data) => {
      this.id = +data['note-title'].split('-')[0];
      this.notesService.getNoteById(this.id).subscribe((data) => {
        this.note = data;
        console.log(data);
      });
    });
  }
  onSubmit() {
    this.submitted = true;

    console.log('clicked');
    this.loading = true;
    this.notesService
      .updateNoteById(this.id, this.noteForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastr.success('', 'Note Updated!');
          console.log(this.route);
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/user/notes']));
        },
      });
  }
}
