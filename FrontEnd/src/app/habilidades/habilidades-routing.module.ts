import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HabilidadesListComponent } from './habilidades-list/habilidades-list.component';

const routes: Routes = [
  { path: '', component: HabilidadesListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HabilidadesRoutingModule { }
