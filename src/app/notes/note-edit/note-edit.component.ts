import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss'],
})
export class NoteEditComponent implements OnInit {
  noteForm: FormGroup;

  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {}
}
