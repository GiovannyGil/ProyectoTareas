import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HabilidadesListComponent } from './habilidades-list/habilidades-list.component';
import { HabilidadesCreateComponent } from './habilidades-create/habilidades-create.component';
import { HabilidadesEditComponent } from './habilidades-edit/habilidades-edit.component';

const routes: Routes = [
  { path: '', component: HabilidadesListComponent },
  { path: 'crear', component: HabilidadesCreateComponent }, // Ruta para crear
  { path: 'editar/:id', component: HabilidadesEditComponent } // Ruta para editar con parámetro ID
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HabilidadesRoutingModule { }
