import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HabilidadesRoutingModule } from './habilidades-routing.module';
import { HabilidadesListComponent } from './habilidades-list/habilidades-list.component';

import { SharedModule } from '../shared/shared.module'; // Importar SharedModule

@NgModule({
  declarations: [
    HabilidadesListComponent
  ],
  imports: [
    CommonModule,
    HabilidadesRoutingModule,
    SharedModule  // Importa SharedModule para usar NavbarComponent
  ]
})
export class HabilidadesModule { }
