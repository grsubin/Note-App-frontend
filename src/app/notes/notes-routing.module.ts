import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { NotesListComponent } from './notes-list/notes-list.component';

const routes: Routes = [
  {
        path: '', component: NotesListComponent,
        children: [
          {
            path: ':note-title', component: NoteDetailsComponent
          }
        ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
