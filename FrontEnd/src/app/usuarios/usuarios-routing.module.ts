import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { UsuariosCreateComponent } from './usuarios-create/usuarios-create.component';
import { UsuariosEditComponent } from './usuarios-edit/usuarios-edit.component';

const routes: Routes = [
  { path: '', component: UsuariosListComponent },
  { path: 'crear', component: UsuariosCreateComponent }, // Ruta para crear
  { path: 'editar/id', component: UsuariosEditComponent } // Ruta para editar
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
