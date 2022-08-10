import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NpDatepickerModule } from 'angular-nepali-datepicker';
import { FlatpickrModule } from 'angularx-flatpickr';

@NgModule({
  declarations: [
    NotesListComponent,
    NoteDetailsComponent,
    AddNoteComponent,
    NoteEditComponent,
  ],
  imports: [
    CommonModule,
    FlatpickrModule.forRoot(),
    ReactiveFormsModule,
    NotesRoutingModule,
    NpDatepickerModule,
    FormsModule,
  ],
  exports: [NoteDetailsComponent, NotesListComponent, AddNoteComponent],
})
export class NotesModule {}
