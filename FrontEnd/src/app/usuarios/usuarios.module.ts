import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';

import { SharedModule } from '../shared/shared.module';
import { UsuariosCreateComponent } from './usuarios-create/usuarios-create.component';
import { UsuariosEditComponent } from './usuarios-edit/usuarios-edit.component'; // Importar SharedModule

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsuariosListComponent,
    UsuariosCreateComponent,
    UsuariosEditComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule, // importa SharedModule para usar el NavbarComponent
    FontAwesomeModule,
    FormsModule
  ]
})
export class UsuariosModule { }
