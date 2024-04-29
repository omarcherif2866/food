import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared/shared.module';
import { SpecialiteService } from '../service/specialite/specialite.service';
import { SpecialiteRoutingModule } from './specialite-routing.module';
import { SpecialiteComponent } from './specialite.component';




@NgModule({
  declarations: [
    SpecialiteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    SpecialiteRoutingModule
  ],
  providers: [
    SpecialiteService
  ],
})
export class SpecialiteModule { }
