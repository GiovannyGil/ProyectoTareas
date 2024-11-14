import { Component } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.css']
})
export class UsuariosEditComponent {
  id!: number;
  nombres: string = ''
  apellidos: string = ''
  nombreusuario: string = ''
  edad: number = 0
  correo: string = ''
  estado: number = 0

  constructor(
    private usuarioServide: UsuariosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  // metodo para cargar los datos existentes}
  cargarDatosUsuario(): void {
    this.usuarioServide.ObtenerUsuario(this.id).subscribe(
      (response) => {
        console.log(`Datos Obtenidos ${response}`);
        const usuario = response.usuario // acceder a los datos

        // asignar los valores
        this.nombres = usuario.nombres
        this.apellidos = usuario.apelldios
        this.nombreusuario = usuario.nombreusuario
        this.edad = usuario.edad
        this.correo = usuario.correo
        this.estado = usuario.estado
      }, (error) => {
        console.log(`Error al cargar los datos ${error.message}`);
      }
    )
  }


  // metodo para actulizar
  actualizarUsurio(): void {
    const usuarioActualizado = {
      nombres: this.nombres,
      apellidos: this.apellidos,
      nombreusuario: this.nombreusuario,
      edad: this.edad,
      correo: this.correo,
      estado: this.estado
    }

    console.log(`Datos a enviar ${usuarioActualizado}`);

    this.usuarioServide.ActualizarUsuario(this.id, usuarioActualizado).subscribe(
      () => {
        alert('Usuario actualizado exitosamente')
        this.router.navigate(['/usuarios'])
      }, 
      (error) => {
        console.log(`Error al actualizar el usuario ${error.message}`);
      }
    )
  }

}
