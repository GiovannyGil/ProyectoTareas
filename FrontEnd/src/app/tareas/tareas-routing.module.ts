import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TareasListComponent } from './tareas-list/tareas-list.component';
import { TareasCreateComponent } from './tareas-create/tareas-create.component';
import { TareasDetailComponent } from './tareas-detail/tareas-detail.component';
import { TareasEditComponent } from './tareas-edit/tareas-edit.component';

const routes: Routes = [
  { path: '', component: TareasListComponent },
  { path: 'crear', component: TareasCreateComponent},
  { path: 'detalle/:id', component: TareasDetailComponent},
  { path: 'editar/:id', component: TareasEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TareasRoutingModule { }
