import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// interface -> tipo y respuesta
interface AuthResponse {
  message: string;
  token: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {}

  // metodo login
  login(nombreusuario: string, clave: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, {nombreusuario, clave}).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token) // guardar el token en el localstorage
        // console.log('token', response.token);
        this.programarCierreSesion() // programar el cierre de sesion
      })
    )
  }

  // metodo registrarse
  register(nombres: string, apellidos: string, nombreusuario: string, edad: number, correo: string, clave: string, estado: number): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, {
      nombres, apellidos, nombreusuario, edad, correo, clave, estado
    })
  }


  // metodo para cerrar session
  logout(): void {
    localStorage.removeItem(this.tokenKey)
    this.router.navigate(['/'])
  }

  // metodo obtener token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }
  
  // metodo para obtener la fecha/tiempo de expiracion del token JWT
  private obtenerFechaExpiracion(): number | null{
    const token = this.getToken() // obtener el token
    if (!token) return null // si no hay token, retornar null
    
    const payload = JSON.parse(atob(token.split('.')[1])) // decodificar la carga util del token
    return payload.exp ? payload.exp * 1000 : null // convertir a milisegundos
  }
  
  // metodo para programar cierre de sesion automatico
  private programarCierreSesion(): void {
    const fechaExpiracion = this.obtenerFechaExpiracion()
    if(!fechaExpiracion) return // si no hay fecha salir
    
    const tiempoRestante = fechaExpiracion - Date.now() // 
    if(tiempoRestante > 0) {
      setTimeout(() => {
        alert('El Token ha Expirado. Serás Redirigido al Inicio')
        this.logout()
      }, tiempoRestante)
    }
  }

  // metodo para verificar si está logeoado
  isLoggedIn(): boolean {
    // verifica si el token actual es valido usando la fecha de expiración
    const fechaExpiracion = this.obtenerFechaExpiracion()
    return fechaExpiracion ? Date.now() < fechaExpiracion : false
  }
}
