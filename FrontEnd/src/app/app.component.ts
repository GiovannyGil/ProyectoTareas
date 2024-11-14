import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';

  // inicializar recursos
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      this.authService.logout() // cerrar sesion si el token expiró
    }
  }
}
