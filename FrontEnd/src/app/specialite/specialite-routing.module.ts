import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialiteComponent } from './specialite.component';

const routes: Routes = [{ path: 'specialites', component: SpecialiteComponent }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialiteRoutingModule { }
