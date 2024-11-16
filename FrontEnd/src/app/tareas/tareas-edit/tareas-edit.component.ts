import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TareasService } from '../tareas.service';

@Component({
  selector: 'app-tareas-edit',
  templateUrl: './tareas-edit.component.html',
  styleUrls: ['./tareas-edit.component.css'],
})
export class TareasEditComponent {
  id!: number;
  nombre: string = '';
  descripcion: string = '';
  dificultad: number = 0;
  usuario: any = { id: 0, nombreusuario: '' }; // Inicialización preventiva
  habilidadesSeleccionadas: any[] = [];
  habilidadesDisponibles: any[] = [];

  constructor(
    private tareasService: TareasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.cargarTarea();
      this.cargarHabilidades();
    } else {
      console.error('ID inválido para la tarea');
    }
  }

  // Método para cargar la tarea
  cargarTarea(): void {
    this.tareasService.ObtenerTareaPorId(this.id).subscribe(
      (response) => {
        const tarea = response.tarea;
        this.nombre = tarea.nombre;
        this.descripcion = tarea.descripcion;
        this.dificultad = tarea.dificultad;
        this.usuario = tarea.usuario || { id: 0, nombreusuario: '' };
        this.habilidadesSeleccionadas = tarea.habilidades || [];
      },
      (error) => {
        console.error('Error al cargar la tarea', error);
      }
    );
  }

  // Método para cargar habilidades disponibles
  cargarHabilidades(): void {
    this.tareasService.ObtenerHabilidades().subscribe(
      (response) => {
        this.habilidadesDisponibles = response.habilidades;
      },
      (error) => {
        console.error('Error al cargar las habilidades', error);
      }
    );
  }

  // Método para añadir habilidades a la lista seleccionada
  agregarHabilidad(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Castea el evento
    const habilidadSeleccionada = JSON.parse(selectElement.value); // Convierte el valor del select (string) a objeto
    if (!this.habilidadesSeleccionadas.includes(habilidadSeleccionada)) {
      this.habilidadesSeleccionadas.push(habilidadSeleccionada);
    }
  }
  

  // Método para quitar habilidades de la lista seleccionada
  quitarHabilidad(habilidad: any): void {
    this.habilidadesSeleccionadas = this.habilidadesSeleccionadas.filter(
      (h) => h.id !== habilidad.id
    );
  }

  // Método para actualizar la tarea
  actualizarTarea(): void {
    const tareaActualizada = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      dificultad: this.dificultad,
      habilidadesIds: this.habilidadesSeleccionadas.map((h) => h.id),
    };

    this.tareasService.ActualizarTarea(this.id, tareaActualizada).subscribe(
      () => {
        alert('Tarea actualizada exitosamente');
        this.router.navigate(['/tareas']);
      },
      (error) => {
        console.error('Error al actualizar la tarea', error);
      }
    );
  }
}
