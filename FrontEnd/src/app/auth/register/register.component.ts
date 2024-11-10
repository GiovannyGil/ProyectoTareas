import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombres: string = '';
  apellidos: string = '';
  nombreusuario: string = '';
  edad: number | null = null;
  correo: string = '';
  clave: string = '';
  estado: number = 1; // Estado por defecto (activo)

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    if (this.nombres && this.apellidos && this.nombreusuario && this.edad && this.correo && this.clave) {
      this.authService.register(this.nombres, this.apellidos, this.nombreusuario, this.edad, this.correo, this.clave, this.estado).subscribe(
        () => {
          alert('Registro exitoso');
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          console.error('Error en el registro', error);
          alert('Error al registrarse');
        }
      );
    } else {
      alert('Por favor, completa todos los campos');
    }
  }
}