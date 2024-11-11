import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HabilidadesRoutingModule } from './habilidades-routing.module';
import { HabilidadesListComponent } from './habilidades-list/habilidades-list.component';

import { SharedModule } from '../shared/shared.module';
import { HabilidadesCreateComponent } from './habilidades-create/habilidades-create.component';
import { HabilidadesEditComponent } from './habilidades-edit/habilidades-edit.component'; // Importar SharedModule

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HabilidadesListComponent,
    HabilidadesCreateComponent,
    HabilidadesEditComponent
  ],
  imports: [
    CommonModule,
    HabilidadesRoutingModule,
    SharedModule,  // Importa SharedModule para usar NavbarComponent
    FontAwesomeModule,
    FormsModule
  ]
})
export class HabilidadesModule { }
