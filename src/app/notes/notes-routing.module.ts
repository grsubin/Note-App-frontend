import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNoteComponent } from './add-note/add-note.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { NotesListComponent } from './notes-list/notes-list.component';

const routes: Routes = [
  {
    path: '',
    component: NotesListComponent,
    children: [
      {
        path: 'view/:note-title',
        component: NoteDetailsComponent,
      },
      {
        path: 'view/:note-title/edit',
        component: NoteEditComponent,
      },
      {
        path: 'add',
        component: AddNoteComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
