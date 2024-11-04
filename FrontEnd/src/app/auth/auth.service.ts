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
        localStorage.setItem(this.tokenKey, response.token)
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


  // metodo para verificar si está logeoado
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey)
  }


  // metodo obtener token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }
}
