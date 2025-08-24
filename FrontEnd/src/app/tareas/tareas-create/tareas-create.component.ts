import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { TareasService } from '../tareas.service';
import { HabilidadesService } from '../../habilidades/habilidades.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tareas-create',
  templateUrl: './tareas-create.component.html',
  styleUrls: ['./tareas-create.component.css']
})
export class TareasCreateComponent implements OnInit {
  nombre: string = '';
  descripcion: string = '';
  dificultad: number = 1;
  habilidadesSeleccionadas: any[] = [];
  habilidadesDisponibles: any[] = [];
  usuario: any;

  constructor(
    private tareasService: TareasService,
    private habilidadesService: HabilidadesService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarioActual();
    this.cargarHabilidades();
  }

  cargarUsuarioActual(): void {
    this.authService.getUsuarioActual().subscribe(
      (response) => {
        this.usuario = response.usuario;
      },
      (error) => {
        console.error("Error al obtener usuario actual:", error.message);
      }
    );
  }


  cargarHabilidades(): void {
    this.habilidadesService.getHabilidades().subscribe(
      (response) => {
        this.habilidadesDisponibles = response.habilidades;
      },
      (error) => {
        console.error('Error al cargar habilidades:', error.message);
      }
    );
  }

  agregarHabilidad(event: Event): void {
    const habilidad = JSON.parse((<HTMLSelectElement>event.target).value);
    if (
      habilidad &&
      !this.habilidadesSeleccionadas.find((h) => h.id === habilidad.id)
    ) {
      this.habilidadesSeleccionadas.push(habilidad);
    }
  }

  quitarHabilidad(habilidad: any): void {
    this.habilidadesSeleccionadas = this.habilidadesSeleccionadas.filter(
      (h) => h.id !== habilidad.id
    );
  }

  crearTarea(): void {
    const nuevaTarea = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      dificultad: this.dificultad,
      usuarioId: this.usuario?.id,
      habilidadesIds: this.habilidadesSeleccionadas.map((h) => h.id)
    };

    this.tareasService.CrearTarea(nuevaTarea).subscribe(
      () => {
        alert('Tarea creada exitosamente');
        this.router.navigate(['/tareas']);
      },
      (error) => {
        console.error('Error al crear la tarea:', error.message);
        alert('Error al crear la tarea');
      }
    );
  }
}
