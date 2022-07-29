import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserdetailsComponent } from './userdetails/userdetails.component';

const routes: Routes = [

  {
    path: 'user-details', component: UserdetailsComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
