import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importar RouterModule para habilitar routerLink
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule ],
  exports: [NavbarComponent] // Exportar el componente para que esté disponible en otros módulos
})
export class SharedModule { }
