import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombreusuario: string = ''
  clave: string = ''

  constructor(private authService: AuthService, private router: Router) {}


  // metodo para logearse
  login(): void{
    this.authService.login(this.nombreusuario, this.clave).subscribe(
      () => {
        this.router.navigate(['/'])
      },
      (error) => {
        console.error('Error al iniciar sesión ', error)
      }
    )
  }

}
