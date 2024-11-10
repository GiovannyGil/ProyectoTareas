import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TareasRoutingModule } from './tareas-routing.module';
import { TareasListComponent } from './tareas-list/tareas-list.component';

import { SharedModule } from '../shared/shared.module'; // Importar SharedModule

@NgModule({
  declarations: [
    TareasListComponent
  ],
  imports: [
    CommonModule,
    TareasRoutingModule,
    SharedModule  // Importa SharedModule para usar NavbarComponent
  ]
})
export class TareasModule { }
