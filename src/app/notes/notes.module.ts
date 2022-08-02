import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NotesListComponent,
    NoteDetailsComponent,
    AddNoteComponent,
    NoteEditComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, NotesRoutingModule],
  exports: [NoteDetailsComponent, NotesListComponent],
})
export class NotesModule {}
