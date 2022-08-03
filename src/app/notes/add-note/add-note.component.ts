import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { NotesService } from 'src/app/core/_services/notes.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {
  noteForm: FormGroup;

  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private notesService: NotesService
  ) {}

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: [''],
    });
  }

  get f() {
    return this.noteForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.noteForm.invalid) {
      return;
    }

    this.loading = true;
    this.notesService
      .addNote({
        title: this.noteForm.value.title,
        body: this.noteForm.value.body,
      })
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastr.success('', 'Note Added!');
          console.log(this.route);
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['user/notes']));
        },
      });
  }
}
