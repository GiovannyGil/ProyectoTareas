import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { UsuariosService } from './usuarios/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';

  // inicializar recursos
  constructor(private usuarioService: UsuariosService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.usuarioService.ObtenerUsuario(1).subscribe({
      next: (usuario) => {
        console.log('Usuario autenticado:', usuario);
        // Aquí podrías almacenar info del usuario si quieres
      },
      error: (err) => {
        if (err.status === 401) {
          console.warn('No autenticado. Cerrando sesión...');
          this.authService.logout();
        }
      }
    });
  }
}
