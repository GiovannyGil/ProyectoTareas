import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TareasService } from '../tareas.service';
import { faEye, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tareas-list',
  templateUrl: './tareas-list.component.html',
  styleUrls: ['./tareas-list.component.css']
})
export class TareasListComponent implements OnInit {
  // Íconos para las acciones
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;

  tareas: any[] = [];
  tareasOriginal: any[] = []; // Almacenará la lista original
  dificultadFiltro: number | null = null;  // Filtro por dificultad

  constructor(private tareasService: TareasService, private router: Router) { }

  ngOnInit(): void {
    this.ObtenerTareas();
  }

  // Obtener todas las tareas
  ObtenerTareas(): void {
    this.tareasService.ObtenerTareas().subscribe(
      (response) => {
        this.tareas = response.tareas;
        this.tareasOriginal = response.tareas; // Guardamos la lista original
      },
      (error) => {
        console.error('Error al obtener las tareas:', error.message);
      }
    );
  }

  // Método actualizado para filtrar por dificultad
  FiltrarPorDificultad(): void {
    if (this.dificultadFiltro === null || this.dificultadFiltro === 0) {
      // Si la opción es "Todas", mostramos todas las tareas
      this.tareas = [...this.tareasOriginal];
    } else {
      // Filtrar por dificultad específica
      this.tareas = this.tareasOriginal.filter(
        (tarea) => tarea.dificultad === +this.dificultadFiltro! // Usamos "!" para asegurar que no es null
      );
    }
  }
  
  


  // Navegar al formulario de crear tarea
  IrCrearTarea(): void {
    this.router.navigate(['/tareas/crear']);
  }

  // Navegar al formulario de editar tarea
  IrEditarTarea(id: number): void {
    this.router.navigate([`/tareas/editar/${id}`]);
  }

  // Navegar a los detalles de una tarea
  VerDetallesTarea(id: number): void {
    this.router.navigate([`/tareas/detalle/${id}`]);
  }

  // Eliminar tarea
  EliminarTarea(id: number): void {
    if (confirm('¿Está seguro que desea eliminar esta tarea?')) {
      this.tareasService.EliminarTarea(id).subscribe(
        () => {
          alert('Tarea eliminada correctamente');
          this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
        },
        (error) => {
          console.error('Error al eliminar la tarea:', error.message);
          alert('Error al eliminar la tarea');
        }
      );
    }
  }
}