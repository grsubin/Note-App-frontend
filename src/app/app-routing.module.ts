import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { UserGuard } from './core/_guards/user.guard';
import { UserdetailsComponent } from './user/userdetails/userdetails.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user/notes',
  },
  {
    path: '',
    canActivate: [UserGuard],
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'user',
    canActivateChild: [UserGuard],
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
  {
    path: '**',
    canActivateChild: [UserGuard],
    redirectTo: 'user/notes',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
