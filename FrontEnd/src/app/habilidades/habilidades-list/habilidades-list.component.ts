import { Component, OnInit } from '@angular/core';
import { HabilidadesService } from '../habilidades.service';
import { Router } from '@angular/router';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-habilidades-list',
  templateUrl: './habilidades-list.component.html',
  styleUrls: ['./habilidades-list.component.css']
})
export class HabilidadesListComponent implements OnInit {
  //iconos -> fontawesome
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;

  // instancias array de habilidades por defecto []
  habilidades : any[] = []

  

  // inyectar el service
  constructor(private habilidadesService: HabilidadesService, private router: Router) {}

  ngOnInit(): void {
      this.obtenerHabilidades()
  }

  // metodo para obtener las habilidades
  obtenerHabilidades(): void {
    this.habilidadesService.getHabilidades().subscribe(
      (data) => {
        this.habilidades = data.habilidades // obtener un array de habilidades que trae el objeto
      },
      (error) => {
        if(error.status === 401){
          console.error('Token no obtenido, debe iniciar sessión nuevamente')
        } else {
          console.error(`Error al obtener las habilidades ${error}`)
        }
      }
    )
  }


  // ir al formulario de creacion
  navegarAFormularioCrear(): void {
    this.router.navigate(['/habilidades/crear'])
  }

  // ir a formulario de actualizar por id
  navegarAFormularioActualizar(id: number): void {
    this.router.navigate(['/habilidades/editar', id])
  }

  // Método para eliminar una habilidad
  eliminarHabilidad(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta habilidad?')) {
      this.habilidadesService.deleteHabilidad(id).subscribe(
        () => {
          this.habilidades = this.habilidades.filter(habilidad => habilidad.id !== id); // Elimina de la lista local
          alert('Habilidad eliminada exitosamente');
        },
        (error) => {
          console.error('Error al eliminar habilidad:', error);
          alert('Error al eliminar la habilidad');
        }
      );
    }
  }

}
