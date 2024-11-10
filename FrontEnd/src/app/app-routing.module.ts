import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// enritador principal
const routes: Routes = [
  { path: '', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) }, // Página principal -> Landing
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, // Módulo de autenticación
  { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) }, // Página de inicio después de login
  { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) }, // Módulo de usuarios
  { path: 'habilidades', loadChildren: () => import('./habilidades/habilidades.module').then(m => m.HabilidadesModule) }, // Módulo de habilidades
  { path: 'tareas', loadChildren: () => import('./tareas/tareas.module').then(m => m.TareasModule) }, // Módulo de tareas
  { path: '**', redirectTo: '' } // Redirecciona a landing si no encuentra la ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
