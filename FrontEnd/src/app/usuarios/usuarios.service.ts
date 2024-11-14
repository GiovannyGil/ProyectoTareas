import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  // URL de la api modulo usuarios
  private apiURL = 'http://localhost:3000/api/usuario'

  // inyectar metodos http/recursos
  constructor(private http: HttpClient) { }

  // Metodo para obtener todos los usuaiors
  ObtenerUsuarios(): Observable<any> {
    const authToken = localStorage.getItem('authToken') // obtener el token del localstorage
    
    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    // hacer el pedido a la api
    return this.http.get<any>(`${this.apiURL}s`, { headers })
  }

  // metodo para obtener usuarios por id
  ObtenerUsuario(id: number): Observable<any> {
    const authToken = localStorage.getItem('authToken') // obtener el token del localstorage
    
    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    return this.http.get<any>(`${this.apiURL}/${id}`, { headers })
  }

  // metodo para elimiar usuario
  EliminarUsuairo(id: number): Observable<any> {
    const authToken = localStorage.getItem('authToken') // obtener el token del localstorage
    
    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    return this.http.delete<void>(`${this.apiURL}/${id}`, { headers })
  }

  // metodo para crear usuarios
  CrearUsuarios(usuario: any): Observable<any>{
    const authToken = localStorage.getItem('authToken') // obtener el token del localstorage
    
    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    return this.http.post<any>(this.apiURL, usuario, { headers })
  }


  // metodo para actualizar
  ActualizarUsuario(id: number, usuario: any): Observable<any>{
    const authToken = localStorage.getItem('authToken') // obtener el token del localstorage
    
    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    return this.http.put<any>(`${this.apiURL}/${id}`, usuario, { headers })
  }
  
}
