import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  // URL de la api modulo usuarios
  private apiURL = 'http://localhost:3000/api/usuarios'

  // inyectar metodos http/recursos
  constructor(private http: HttpClient) { }

  // Metodo para obtener todos los usuaiors
  ObtenerUsuarios(): Observable<any> {
    // hacer el pedido a la api
    return this.http.get<any>(`${this.apiURL}`, { withCredentials: true })
  }

  // metodo para obtener usuarios por id
  ObtenerUsuario(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${id}`, { withCredentials: true })
  }

  // metodo para elimiar usuario
  EliminarUsuairo(id: number): Observable<any> {
    return this.http.delete<void>(`${this.apiURL}/${id}`, { withCredentials: true })
  }

  // metodo para crear usuarios
  CrearUsuarios(usuario: any): Observable<any>{
    return this.http.post<any>(this.apiURL, usuario, { withCredentials: true })
  }


  // metodo para actualizar
  ActualizarUsuario(id: number, usuario: any): Observable<any>{
    return this.http.patch<any>(`${this.apiURL}/${id}`, usuario, { withCredentials: true })
  }
  
}
