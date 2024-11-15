import { Component } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-create',
  templateUrl: './usuarios-create.component.html',
  styleUrls: ['./usuarios-create.component.css']
})
export class UsuariosCreateComponent {
  nombres: string = ''
  apellidos: string = ''
  nombreusuario: string = ''
  clave: string = ''
  edad: number = 0
  correo: string = ''
  estado: number = 0

  constructor (private usuarioService: UsuariosService, private router: Router) {}

  // metodo para crear usuarios
  crearUsuario(): void {
    const nuevoUsuario = {
      nombres: this.nombres,
      apellidos: this.apellidos,
      nombreusuario: this.nombreusuario,
      clave: this.clave,
      edad: this.edad,
      correo: this.correo,
      estado: this.estado
    }

    this.usuarioService.CrearUsuarios(nuevoUsuario).subscribe(
      () => {
        alert('Usuario creado exitosamente')
        this.router.navigate(['/usuarios'])
      }, (error) => {
        console.log(`Error al crear el usuario ${error.message}`);
      }
    )
  }

}
