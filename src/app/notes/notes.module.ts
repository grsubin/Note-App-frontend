import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteDetailsComponent } from './note-details/note-details.component';


@NgModule({
  declarations: [
    NotesListComponent,
    NoteDetailsComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule
  ],
  exports:[
    NoteDetailsComponent,
    NotesListComponent
  ]
})
export class NotesModule { }
