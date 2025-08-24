import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

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
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, {nombreusuario, clave}, {
      withCredentials: true, // enviar cookies con la solicitud
    })
  }

  // metodo registrarse
  register(nombres: string, apellidos: string, nombreusuario: string, edad: number, correo: string, clave: string, estado: number): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, {
      nombres, apellidos, nombreusuario, edad, correo, clave, estado
    })
  }

  // metodo para cerrar session
  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, {
      withCredentials: true
    }).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  getUsuarioActual(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`, { withCredentials: true });
  }


  // metodo para verificar si está logeoado
  // checkAuthStatus() {}
  checkAuthStatus(): Observable<boolean> {
    return this.http.get<{ authenticated: boolean }>(`${this.apiUrl}/check-auth`, {
      withCredentials: true
    }).pipe(
      map(res => res.authenticated),
      catchError(() => of(false))
    );
  }

}
