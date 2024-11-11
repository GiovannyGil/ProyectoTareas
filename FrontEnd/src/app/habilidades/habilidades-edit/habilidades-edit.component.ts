import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HabilidadesService } from '../habilidades.service';

@Component({
  selector: 'app-habilidades-edit',
  templateUrl: './habilidades-edit.component.html',
  styleUrls: ['./habilidades-edit.component.css']
})
export class HabilidadesEditComponent implements OnInit {
  id!: number;
  nombre: string = '';
  descripcion: string = '';
  nivel: number = 1;

  constructor(
    private habilidadesService: HabilidadesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID desde la ruta
    this.id = +this.route.snapshot.paramMap.get('id')!;
    console.log('ID obtenido:', this.id); // Verificar que el ID se obtenga correctamente
    this.cargarDatosHabilidad();
  }

  // Método para cargar los datos de la habilidad desde el servicio
  cargarDatosHabilidad(): void {
    this.habilidadesService.getHabilidad(this.id).subscribe(
      (response) => {
        console.log('Datos de la habilidad obtenidos:', response); // Verificar los datos obtenidos
        const habilidad = response.habilidad; // Acceder a los datos anidados en la propiedad `habilidad`
  
        // Asignar los valores de la habilidad a las propiedades del formulario
        this.nombre = habilidad.nombre;
        this.descripcion = habilidad.descripcion;
        this.nivel = habilidad.nivel;
      },
      (error) => {
        console.error('Error al cargar habilidad:', error);
      }
    );
  }
  

  // Método para actualizar la habilidad
  actualizarHabilidad(): void {
    const habilidadActualizada = { nombre: this.nombre, descripcion: this.descripcion, nivel: this.nivel };
    console.log('Datos a enviar en actualización:', habilidadActualizada); // Verificar datos de actualización

    this.habilidadesService.updateHabilidad(this.id, habilidadActualizada).subscribe(
      () => {
        alert('Habilidad actualizada exitosamente');
        this.router.navigate(['/habilidades']);
      },
      (error) => {
        console.error('Error al actualizar habilidad:', error);
      }
    );
  }
}