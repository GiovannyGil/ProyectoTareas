import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HabilidadesService } from '../habilidades.service';

@Component({
  selector: 'app-habilidades-create',
  templateUrl: './habilidades-create.component.html',
  styleUrls: ['./habilidades-create.component.css']
})
export class HabilidadesCreateComponent {
  nombre: string = '';
  descripcion: string = '';
  nivel: number = 1;

  constructor(private habilidadesService: HabilidadesService, private router: Router) {}

  crearHabilidad(): void {
    const nuevaHabilidad = { nombre: this.nombre, descripcion: this.descripcion, nivel: this.nivel };
    this.habilidadesService.createHabilidad(nuevaHabilidad).subscribe(
      () => {
        alert('Habilidad creada exitosamente');
        this.router.navigate(['/habilidades']);
      },
      (error) => {
        console.error('Error al crear habilidad:', error);
      }
    );
  }
}