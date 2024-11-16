import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TareasRoutingModule } from './tareas-routing.module';
import { TareasListComponent } from './tareas-list/tareas-list.component';

import { SharedModule } from '../shared/shared.module';
import { TareasCreateComponent } from './tareas-create/tareas-create.component';
import { TareasEditComponent } from './tareas-edit/tareas-edit.component';
import { TareasDetailComponent } from './tareas-detail/tareas-detail.component'; // Importar SharedModule

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TareasListComponent,
    TareasCreateComponent,
    TareasEditComponent,
    TareasDetailComponent
  ],
  imports: [
    CommonModule,
    TareasRoutingModule,
    SharedModule,  // Importa SharedModule para usar NavbarComponent
    FontAwesomeModule,
    FormsModule
  ]
})
export class TareasModule { }
