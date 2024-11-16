import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TareasService } from '../tareas.service';

@Component({
  selector: 'app-tareas-detail',
  templateUrl: './tareas-detail.component.html',
  styleUrls: ['./tareas-detail.component.css']
})
export class TareasDetailComponent implements OnInit {
  tarea: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tareasService: TareasService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.CargarDetalle(id);
    } else {
      alert('ID inválido');
      this.router.navigate(['/tareas']);
    }
  }

  CargarDetalle(id: number): void {
    this.tareasService.ObtenerTareaPorId(id).subscribe(
      (response) => {
        this.tarea = response.tarea;
      },
      (error) => {
        console.error('Error al obtener los detalles:', error);
        alert('Error al cargar los detalles de la tarea');
        this.router.navigate(['/tareas']);
      }
    );
  }

  Volver(): void {
    this.router.navigate(['/tareas']);
  }
}
