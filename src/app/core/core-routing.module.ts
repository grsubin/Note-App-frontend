import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from '../calendar/calendar.component';
import { UserdetailsComponent } from '../user/userdetails/userdetails.component';
import { CoreComponent } from './core.component';
import { NotesResolver } from './_resolver/notes.resolver';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: 'notes',
        loadChildren: () =>
          import('../notes/notes.module').then((m) => m.NotesModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        resolve: {
          notes: NotesResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
